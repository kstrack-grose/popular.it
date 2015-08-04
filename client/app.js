angular.module('popular', [])

.factory('Users', function($http) {

  var compareUser = function(username) {
    return $http({
      method: 'POST',
      url: '/users',
      data: {username: username}
    }).then(function(friends) {
      console.log(11, friends);
      return friends
      // return compareData(friends.data);
    }).catch(function(err) {
      console.log(14, 'error using $http', err);
    })
    console.log(25, 'compareUser');
  };

  var compareData = function(power) {
    return "you are this powerful: " + power;
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