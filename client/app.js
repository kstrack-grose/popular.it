angular.module('popular', [])

.factory('Users', function($http) {

  var average = 20;

  var replies = ['you are unpopular'];

  var compareUser = function(username) {
    return $http({
      method: 'POST',
      url: '/users',
      data: {username: username}
    }).then(function(friends) {
      console.log(11, friends.data);
      compareData(friends.data);
      return friends
    }).catch(function(err) {
      console.log(14, 'error using $http', err);
    });
  };

  var compareData = function(power) {
    var lessThanAverage = power <= average;
    $http({
      method: 'GET',
      url: '/users',
      data: {average: average,
             lessThanAverage: lessThanAverage}
    }).then(function(tuple) {
      // compare power with average
      console.log('returned from GET with power', power, 'and database average', tuple);
        //reduce the allUsers array accordingly
        //take the result of that reduce, find a mean
        //compare that mean and compare with power
        //return the appropriate reply from replies obj/arr
    })
    .catch(function(err) {
      console.log(37, 'error in $http', err);
    });
  };

  return {
    compareUser: compareUser,
    compareData: compareData
  }
})

.controller('PopularCtrl', function ($scope, $location, Users) {
  $scope.username = '';
  //hardcoded for now;
  $scope.message = '';

  // look up their data in comparison to others'
  $scope.lookUp = function() {
    // go to Users factory and get the promise from there
    // Users.compareUser($scope.username)
    //   .then(function(result) {
    //     // for now, just add to the message
    //     $scope.message = result;
    //   })
    //   .catch(function(err) {
    //     $scope.message = err;
    //   });
    Users.compareUser($scope.username)
      .then(function(result) {
        $scope.message = result.data;
        $scope.username = '';
        return;        
      })
      .catch(function(err) {
        console.log(53, err);
      });
  };
});
