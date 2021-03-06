var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home2', isAuthenticated, function(req, res){
		res.render('test_view', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/weeks/:id', function(req, res){
		var week = req.param('id');
		res.render('week', {week: req.param('id')});
	});

	router.get('/testing', function(req, res){
		res.render('test_view',{user: 'Petey'});
	});

	router.get('/week2/:id', isAuthenticated, function(req, res){
		res.render('test_table',{week: req.param('id')});
	});

	router.get('layout', function(req,res){
		res.render('layout');
	});

	router.get('/week/:id', isAuthenticated, function(req,res){
		res.render('block_table',{week:req.param('id')});
	})

	router.get('/home', isAuthenticated, function(req,res){
		res.render('new_test_view',{user:req.user});
	});

	return router;
}





