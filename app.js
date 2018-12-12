var _ = require('lodash');
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine', hbs);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: '123123',
	resave: false,
	saveUninitialized: true
}));

mongoose.connect('mongodb://localhost/user-system', { useNewUrlParser: true });

var {User} = require('./models/user');

//CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Global Vars
app.use(function (req, res, next) {
	res.locals.user = req.session.user || null;
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

app.get('/dashboard', function(req, res){
	if(!req.session.user){
		return res.status(401).send();
	}
	res.render('dashboard.hbs', {
		pageTitle: 'Dashboard'
	});
});


app.post('/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		req.session.user = user;
		console.log('Sign in success!');
		res.status(200).send(user);
	}).catch((e) => {
		console.log('Sign in error');
		res.status(400).send();
	});
});


app.post('/register', function(req, res){
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then(() => {
		req.session.user = user;
		console.log('Registration success!');
		res.status(200).send(user);

	}).catch((e) => {
		res.status(400).send(e);
	});
});


app.delete('/logout', function(req, res){
	req.session.destroy(function(err) {
	  if(err){
	  	console.log(err);
	  }else{
	  	console.log('Logged out');
	  	res.status(200).send();
	  }
	});
});


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});