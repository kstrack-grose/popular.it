angular.module('popular', [])

.factory('Users', function($http) {

  var compareUser = function(username) {
    /* see if they're in the database. If not, 
    redirect to addUser factory fn and add
    them. After that/if they are in the db */
    console.log(9, 'compareUser');
    //also, will be promises. for now:
    return 'This is a message';
  }

  return {
    compareUser: compareUser
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
    console.log(34, "lookUp");
    $scope.message = Users.compareUser($scope.username);
    return;
  };

});