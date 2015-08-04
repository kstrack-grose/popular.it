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
      console.log(14, friends.data);
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
      var averages = results.data;
      if (power < averages.low) {
        return "wow, you're really unpopular. go friend more of your high school enemies."
      } else if (power > averages.low && power < averages.mid) {
        return "eh, you're almost average. passable, I guess.";
      } else if (power > averages.mid && power < averages.high) {
        return "you're a bit above average. this means you're probably a decent human being. probably.";
      } else if (power > averages.high) {
        return "OH EM GEE you are SOOOOO popular LIEK WOAAH";
      } else {
        return "kiri you fucked up somewhere";
      };
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
