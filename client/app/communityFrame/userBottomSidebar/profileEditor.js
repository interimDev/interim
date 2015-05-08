angular.module('interim.userBottomSidebar', [])

.controller('profileEditorController', function ($scope, $firebaseArray) {
  //getting users current name from github
  var ref = new Firebase("https://interim.firebaseio.com/UsersDB");
  $scope.userInfo = $firebaseArray(userInfo);
  console.log("New Controller: ", $scope.userInfo);
  
});