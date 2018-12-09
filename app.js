var _ = require('lodash');
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine', hbs);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/user-system', { useNewUrlParser: true });

var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

//CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function(req, res){
	res.send('Hello World!!');
});

app.get('/register', function(req, res){
	res.render('register.hbs', {
		pageTitle: 'Register'
	});
});

app.get('/login', function(req, res){
	res.render('login.hbs', {
		pageTitle: 'Log In'
	});
});

app.get('/dashboard', authenticate, function(req, res){
	res.render('dashboard.hbs', {
		pageTitle: 'Dashboard'
	});
});

// app.get('/todos', authenticate, (req, res) => {
// 	Todo.find({
// 		_creator: req.user._id
// 	}).then((todos) => {
// 		res.send({todos});
// 	}, (e) => {
// 		res.status(400).send(e);
// 	});
// });


app.post('/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		user.generateAuthToken().then((token) => {
			console.log('Sign in success!');
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		console.log('Sign in error');
		res.status(400).send();
	});
});


app.post('/register/', function(req, res){
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});