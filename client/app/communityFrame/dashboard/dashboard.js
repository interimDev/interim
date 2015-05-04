angular.module('interim.dashboard', ["firebase"])

.controller('DashboardController', function($scope, $firebaseArray) {

  var ref = new Firebase("https://interim.firebaseio.com/room-metadata");
  // download the data into a local object
  $scope.rooms = $firebaseArray(ref);
  // putting a console.log here won't work, see below
});
