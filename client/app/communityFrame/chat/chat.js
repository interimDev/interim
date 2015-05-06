angular.module('interim.chat', ["firebase", "luegg.directives"])

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
        userId: $rootScope.user.id,
        userProfileImage: $rootScope.userInfo.avatar_url,
        name: $rootScope.user.displayName,
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
    console.log(user);
    console.log(user.userId.cachedUserProfile.avatar_url);
    bootbox.dialog({
      //message provides us with most of the major details in the user profile.
      message:  "<img id='modalProfilePic' src='" + user.userProfileImage + "'/>"+ "<br>" +
                "<h3>" + user.userId.username + "</h3>" + "<br>" +
                "Location: " + user.userId.cachedUserProfile.location + "<br>" +
                "<a target='new' href='" + user.userId.cachedUserProfile.html_url + "'>Github Profile</a>", 
      title: user.name + "'s Profile",
      closeButton: true,
      onEscape: true
    });
  }
});
