// HTTP server using Express to handle incoming requests
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan'); // helps log all requests


var cookieParser = require('cookie-parser'); // for handling cookies
var bodyParser = require('body-parser'); // for parsing request URL


// set up logger and parsers
app.use(logger('dev')); // set up logger and parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chordApp');

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});



// Our ReST API
var chord = require('./chord_api');


app.use(function (req, res, next) {
    // Website I want to allow, * means allow all
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods that are allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Cache-Control');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Passing to next layer of the middleware software
    next();
});


app.use('/myapi', router);
app.use('/myapi', chord);


// Function to handle client errors
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// start the server
app.listen(8080, function () {
    console.log('Server listening on port 8080!');
});


module.exports = app;