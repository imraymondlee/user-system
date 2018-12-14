var express = require('express');
var router = express.Router();
var _ = require('lodash');
var session = require('express-session');

var {User} = require('../models/user');

router.get('/', function(req, res){
	res.render('register.hbs', {
		pageTitle: 'Register'
	});
});

router.get('/register', function(req, res){
	res.render('register.hbs', {
		pageTitle: 'Register'
	});
});

router.get('/login', function(req, res){
	res.render('login.hbs', {
		pageTitle: 'Log In'
	});
});

router.get('/dashboard', function(req, res){
	if(!req.session.user){
		return res.status(401).send();
	}

	User.find({}, function(err, users){
		if(err){
			return res.send('Error!');
		}
		res.render('dashboard.hbs', {
			users: users,
			email: req.session.user.email,
			pageTitle: 'Dashboard'
		});
	});
});


router.post('/login', (req, res) => {
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


router.post('/register', function(req, res){
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


router.delete('/logout', function(req, res){
	req.session.destroy(function(err) {
	  if(err){
	  	console.log(err);
	  }else{
	  	console.log('Logged out');
	  	res.status(200).send();
	  }
	});
});

module.exports = router;