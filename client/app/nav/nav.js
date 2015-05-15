angular.module('interim.nav', ["firebase"])

.controller('NavController', function ($scope, $rootScope, Auth, Permissions, $state) {
  // Your code here
  var ref = new Firebase("https://interim.firebaseio.com/");

  $scope.signOut = function() {

    console.log("User will sign out here! .... well, not yet");
    //To-do: Need to unauth current user. May need to update Auth in services.js
    ref.unauth();

  };

});


