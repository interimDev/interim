angular.module('interim.nav', ["firebase"])

.controller('NavController', function ($scope, $rootScope, Auth, $state) {
  var ref = new Firebase("https://interim.firebaseio.com/");
  $scope.userInfo = $rootScope.userInfo;

  $scope.signOut = function() {
    var userId = '' + $scope.userInfo.name + "-" + $scope.userInfo.auth.provider;
    ref.child('UsersDB').child(userId).child('auth').remove();
    $rootScope.userInfo = [];
    };

});


