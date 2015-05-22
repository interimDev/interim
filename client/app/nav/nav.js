angular.module('interim.nav', ["firebase"])

.controller('NavController', function ($scope, $rootScope, Auth, Permissions, $state) {
  // Your code here
  var ref = new Firebase("https://interim.firebaseio.com/");

  $scope.signOut = function() {
    $rootScope.userInfo = null;
    ref.unauth();
  };
});


