/* dependencies */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var http = require('http');
var routes = require('./client/routes.js');

var app = express();

//middleware
app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// app.use('./client', express.static('index'));z

app.listen(8080);

// just in case
module.exports = app;