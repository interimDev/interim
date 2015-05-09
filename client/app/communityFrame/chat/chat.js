angular.module('interim.chat', ["firebase", "luegg.directives"])

.controller('ChatController', function ($scope, $firebaseArray, $rootScope, $firebaseObject) {

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
    //won't send empty message
    if ($scope.msg) {
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
  }

  var userRef = new Firebase("https://interim.firebaseio.com/UsersDB");

  //This variable is an object containing the users in our database
  var users = $firebaseObject(userRef);

  //this function creates a popup modal with the users information
  $scope.personalInfo = function(user) {

    //Name of message author
    var name = user.name;
    var currentUser = users[name + "-github"];
    console.log(currentUser);

    bootbox.dialog({
      //message provides us with most of the major details in the user profile.
      message:  "<img id='modalProfilePic' src='" + currentUser.avi_url + "'/>"+ "<br>" + "<br>" + 
                "Location: " + currentUser.profile.location + "<br>" +
                "Biography: " + currentUser.profile.bio + "<br>" + 
                "Links: <a target='_new' href='" + currentUser.profile.twitter + "'>Twitter</a> " + "<a target='_new' href='" + currentUser.profile.linkedIn + "'>LinkedIn</a>" ,
      title: user.name + "'s Profile",
      closeButton: true,
      onEscape: true
    });
  }
});
