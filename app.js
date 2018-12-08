var express = require('express');
var hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine', hbs);


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

app.get('/dashboard', function(req, res){
	res.render('dashboard.hbs', {
		pageTitle: 'Dashboard'
	});
});

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});