/* dependencies */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var http = require('http');

var app = express();

/* middleware */
//serve static angular file
app.use(express.static(__dirname + '/client'));

//logger
app.use(morgan('dev'));

//body parser for requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/* start server */
app.listen(8080);

// in case we'll need it elsewhere
module.exports = app;