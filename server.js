/* dependencies */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var http = require('http');
var db = require('./app/config');
var Users = require('./app/users');
var User = require('./app/user');
var _ = require('underscore');

var app = express();

/* middleware */
//serve static angular file
app.use(express.static(__dirname + '/client'));

//logger
app.use(morgan('dev'));

//body parser for requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var avg = 20;
// GET //
app.get('/users', function(req, res) {
  return Users.fetch()
    .then(function(users) {
      console.log(users.models);
      if (req.body.lessThanAverage) {
        var average = _.reduce(users.models, function(memo, next) {
          // compiling only if < av
          if (next.get('power') <= req.body.average) {
            return [memo[0] + next.get('power'), memo[1]+=1];
          }
        }, [0, 0]);
      } else {
        var average = _.reduce(users.models, function(memo, next) {
          console.log('--------->', next);
          //compile if > av
          if (next.get('power')) {
            return [memo[0] + next.get('power'), memo[1]+=1];
          }
        }, [0, 0]);
      }
      res.send(JSON.stringify(average));
    })
    .catch(function(err) {
      console.log(62, 'error in fetching all users:', err);
      res.end();
    });
});

// POST //
app.post('/users', function(req, res) {
  /* see if they're in the database. If not, 
  redirect to addUser factory fn and add
  them. After that/if they are in the db */
  return new User({twitterHandle: req.body.username}).fetch()
    .then(function(found) {
      if (found) {
        console.log('found power:', found.get('power'));
        res.send(JSON.stringify(found.get('power')));
      } else {
        var user = new User({
          twitterHandle: req.body.username,
          //hardcoded for now
          power: 20
        });
        user.save()
        .then(function(newUser) {
          console.log('new user power: ', newUser.get('power'));
          res.send(JSON.stringify(newUser.get('power')));
        })
        .catch(function(err) {
          console.log(455, 'error in saving new user:', err);
          res.end();
        });
      }
    })
    .catch(function(err) {
      console.log(51, 'error in looking up user:', err);
      res.end();
    });
});



/* start server */
app.listen(8080);

// in case we'll need it elsewhere
module.exports = app;