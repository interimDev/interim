angular.module('interim.chat', ["firebase", "luegg.directives"])

.controller('ChatController', function ($scope, $firebaseArray, $rootScope) {

  var ref = new Firebase("https://interim.firebaseio.com/room-messages");
  //get all messages for specific room
  $rootScope.messages = function(roomId) {
    
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
        userId: $rootScope.userInfo.id,
        userProfileImage: $rootScope.userInfo.avi_url,
        name: $rootScope.userInfo.name,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        message: $scope.msg,
        type: 'default'
      }
    //reset input box
    $scope.msg = "";

    msg.set(message);
  }

  //this function creates a popup modal with the users information
  $scope.personalInfo = function(user) {
    bootbox.dialog({
      //message provides us with most of the major details in the user profile.
      message:  "<img id='modalProfilePic' src='" + user.userProfileImage + "'/>"+ "<br>",
      title: user.name + "'s Profile",
      closeButton: true,
      onEscape: true
    });
  }
});
