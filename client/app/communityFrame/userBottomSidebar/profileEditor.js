angular.module('interim.profileEditor', [])

.controller('profileEditorController', function ($scope, $firebaseArray) {
  //getting users current name from github
  var ref = new Firebase("https://interim.firebaseio.com/UsersDB");
});