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
      // find absolute average
      var average = _.reduce(users.models, function(memo, next) {
        // create a tuple of [total power, num of users];
        if (next.get('power')) {
          return [memo[0] + next.get('power'), memo[1]+=1];
        }
      }, [0, 0]);
      //calculate average
      average = average[0]/average[1];
      //reduce again to find the low and high mids
      var mids = _.reduce(users.models, function(memo, next) {
        var pow = next.get('power');
        if (pow <= average) {
          return {'low': [memo.low[0]+pow, memo.low[1]+=1], 'high': memo.high}
        } else {
          return {'low': memo.low, 'high': [memo.high[0]+pow, memo.high[1]+=1]}
        }
      }, {'low': [0, 0], 'high': [0, 0]});
      //put average into an object
      average = {'mid': average};
      //insert low and high mid ranges with some math
      average.low = mids.low[0]/mids.low[1];
      average.high = mids.high[0]/mid.high[1];
      //send it off!
      res.send(JSON.stringify(average));
    })
    .catch(function(err) {
      console.log(39, 'error in fetching all users:', err);
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
        var friends = Math.floor(Math.random() * 2000);
        console.log('----------->', friends);
        var user = new User({
          twitterHandle: req.body.username,
          power: friends
        });
        user.save()
        .then(function(newUser) {
          console.log('new user power: ', newUser.get('power'));
          res.send(JSON.stringify(newUser.get('power')));
        })
        .catch(function(err) {
          console.log(67, 'error in saving new user:', err);
          res.end();
        });
      }
    })
    .catch(function(err) {
      console.log(73, 'error in looking up user:', err);
      res.end();
    });
});



/* start server */
app.listen(8080);

// in case we'll need it elsewhere
module.exports = app;