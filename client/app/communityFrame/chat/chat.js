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

  //message character count
  $scope.messageCount = function() {
    if($scope.msg) {
      console.log($scope.msg.length);
    }
  }

  //send messages to specific room
  $scope.sendMessage = function() {
    //check if message is empty
    if ($scope.msg) {
      // make sure message is under 120 characters
      if ($scope.msg.length < 121) {
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
      } else {
        //notify is message is over 120 characters
        var lengthExceeded = $scope.msg.length - 120;
        $.notify("Your message exceeds length by " + lengthExceeded +
          "  characters", "error");
      }
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
