angular.module('interim.chat', ["firebase"])

.controller('ChatController', function ($scope, $firebaseArray, $rootScope) {

  var ref = new Firebase("https://interim.firebaseio.com/room-messages");
  //get all messages for specific room
  $rootScope.displayMessages = function(roomId) {
    
    //get data for specific room
    var messages = $firebaseArray(ref.child(roomId));
    $scope.messages = messages;
    $scope.roomId = roomId;

    //show chat input when room is selected
    $("#chatRow").css('visibility', 'visible');
  }

  //send messages to specific room
  $scope.sendMessage = function() {
    var msg = ref.child($scope.roomId).push();
      var message = {
        userId: $rootScope.user,
        name: "anonymous",   // TODO: FIX THIS!!!
        timestamp: Firebase.ServerValue.TIMESTAMP,
        message: $scope.msg,
        type: 'default'
      }
     //reset input box
     $scope.msg = "";
     msg.set(message);
  }
});
