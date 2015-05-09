angular.module('interim.userProfile', [])

.controller('UserProfileController', function ($scope, $modal, user, $firebaseObject) {
  // Your code here
  ref = new Firebase("https://interim.firebaseio.com/UsersDB");
  var users = $firebaseObject(ref);

  users.$loaded().then(function() {
    $scope.data = users;
    var userKey = user+'-github';
    $scope.clickedUser = $scope.data[userKey];
  });

  $scope.update = function(user) {
    $scope.master = angular.copy(user);
    console.log($scope.master);
    //update user profile in database upon edit
  };

  $scope.reset = function() {
    $scope.community = {};
  };
});