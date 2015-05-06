angular.module('interim.userProfile', [])

.controller('UserProfileController', function ($scope, $firebaseArray, $modal, $log) {
  // Your code here
  userInfo = new Firebase("https://interim.firebaseio.com/UsersDB");
  
  $scope.users = $firebaseArray(userInfo);
  console.log($scope.users);

});