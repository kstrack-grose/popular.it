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
      return compareData(friends.data);
    }).catch(function(err) {
      console.log(14, 'error using $http', err);
    });
  };

  var compareData = function(power) {
    return $http({
      method: 'GET',
      url: '/users'
    }).then(function(results) {
      var tuple = results.data;
      var dbAvg = tuple[0]/tuple[1];
      if (power <= dbAvg) {
        return 'Eh...you\'re almost average.';
      } else {
        return "Wow, you're above average. So. Popular.";
      }
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
    Users.compareUser($scope.username)
      .then(function(result) {
        $scope.message = result;
        $scope.username = '';
        return;        
      })
      .catch(function(err) {
        console.log(53, err);
      });
  };
});
