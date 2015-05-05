angular.module('interim.chat', ["firebase"])

.controller('ChatController', function ($scope, $firebaseArray, $rootScope) {

  var ref = new Firebase("https://interim.firebaseio.com/room-messages");
  //get all messages for specific room
  $scope.messagesTest = function() {
    //get data for specific room
    var messages = $firebaseArray(ref.child($rootScope.roomId));
    $scope.messages = messages;
    console.log(messages);
  }

  //TODO: send messages to specific room
  $scope.sendMessage = function() {
    var message = {
      userId: "anonymous:-JoWKcuh_THLgIR8wXKy",
      name: "-JoWKcuh",
      timestamp: Firebase.ServerValue.TIMESTAMP,
      message: messageContent,
      type: 'default'
    }
  }

});
