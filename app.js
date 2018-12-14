var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();

// Routes
var routes = require('./routes/index');


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


app.use('/', routes);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});