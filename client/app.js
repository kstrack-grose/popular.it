angular.module('popular', [])

.factory('Users', function($http) {

  // compareUser method queries the server and then calls
  // compareData with the number representing the social
  // media influence of the current user
  var compareUser = function(username) {
    return $http({
      method: 'POST',
      url: '/users',
      data: {username: username}
    }).then(function(friends) {
      return compareData(friends.data);
    }).catch(function(err) {
      console.log(14, 'error using $http', err);
    });
  };

  // compareData method takes the social media influence of the current
  // user and returns a message based on how that influence compares to
  // other users in our database
  var compareData = function(power) {
    return $http({
      method: 'GET',
      url: '/users'
    }).then(function(results) {
      var averages = results.data;
      if (power < averages.low) {
        return "I'm sorry, but you are terribly unpopular. Rethink the role social media plays in your life."
      } else if (power > averages.low && power < averages.mid) {
        return "Your popularity is below average. Rethink the role social media plays in your life.";
      } else if (power > averages.mid && power < averages.high) {
        return "Your popularity is a bit above average. How much time are you spending on social media?";
      } else (power > averages.high) {
        return "You are EXCEPTIONALLY POPULAR. How much time are you spending on social media?";
      };
    })
    .catch(function(err) {
      console.log(37, 'error in $http', err);
    });
  };

  // object to return the correct factory method
  return {
    compareUser: compareUser,
    compareData: compareData
  }
})

.controller('PopularCtrl', function ($scope, $location, Users) {
  // scope variables for data binding
  $scope.username = '';
  $scope.message = ' ';

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
