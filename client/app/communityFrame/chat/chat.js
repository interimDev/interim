angular.module('interim.chat', ["firebase"])

.controller('ChatController', function ($scope, $firebaseArray, $rootScope) {

  var ref = new Firebase("https://interim.firebaseio.com/room-messages");
  // download the data into a local object

  $scope.messagesTest = function(){

    var messages = $firebaseArray(ref.child($rootScope.roomId));
    console.log(messages);

      // console.log($rootScope.roomId);
      $scope.messages = messages;
      $scope.username = messages.name;

  }



});
