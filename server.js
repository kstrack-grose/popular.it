/* dependencies */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var http = require('http');
var db = require('./app/config');
var Users = require('./app/users');
var User = require('./app/user');

var app = express();

/* middleware */
//serve static angular file
app.use(express.static(__dirname + '/client'));

//logger
app.use(morgan('dev'));

//body parser for requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/users', function(req, res) {
  /* see if they're in the database. If not, 
  redirect to addUser factory fn and add
  them. After that/if they are in the db */

  new User({twitterHandle: req.body.username}).fetch()
    .then(function(found) {
      if (found) {
        return found.power;
      } else {
        var user = new User({
          twitterHandle: req.body.username,
          //hardcoded for now
          power: 20
        });
        user.save()
        .then(function(newUser) {
          console.log(40, newUser);
          return newUser.get('power');
        })
        .catch(function(err) {
          console.log(43, 'error in saving new user: ', err);
        });
      }
    })
    .catch(function(err) {
      console.log(48, 'error in looking up user: ', err);
    });
})


/* start server */
app.listen(8080);

// in case we'll need it elsewhere
module.exports = app;