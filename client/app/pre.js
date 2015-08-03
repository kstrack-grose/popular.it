angular.module('popular', [])

.controller('PopularCtrl', function ($scope, $location, Users) {
  $scope.username = '';
  //hardcoded for now;
  $scope.message = 'This is a message';

  // look up their data in comparison to others'
  $scope.lookUp = function() {
    // go to Users factory and get the promise from there
    Users.addUser($scope.username)
      .then(function(result) {
        // for now, just add to the message
        $scope.message = result;
      })
      .catch(function(err) {
        $scope.message = err;
      });
  };

});