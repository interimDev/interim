angular.module('interim.chat', ["firebase", "luegg.directives"])

.controller('ChatController', function ($scope, $firebaseArray, $rootScope, $firebaseObject, $modal) {
  $scope.userInfo = $rootScope.userInfo ? $rootScope.userInfo : $rootScope.communityInfo;
  var ref = new Firebase("https://interim.firebaseio.com/room-messages");
  //get all messages for specific room
  $rootScope.messages = function(roomId) {
    //get data for specific room
    var messages = $firebaseArray(ref.child(roomId));
    
    $scope.messages = messages;
    $scope.roomId = roomId;

    //show chat input when room is selected
    $("#chatRow").css('visibility', 'visible');
  };

  //send messages to specific room
  $scope.sendMessage = function() {
    //check if message is empty
    if ($scope.msg) {
      var msg = ref.child($scope.roomId).push();
      var message = {
        userId: userCurrentID,
        userProfileImage: $rootScope.userInfo ? $rootScope.userInfo.avi_url : null,
        name: $rootScope.userInfo ? $rootScope.userInfo.name : $rootScope.communityInfo.name,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        message: $scope.msg,
        type: 'default'
      };
      //reset input box
      $scope.msg = "";
      msg.set(message);
    } 
  };

  //this function creates a popup modal with the users information
  $scope.userModal = function(user) {
    var name = user.name;   
    $scope.userName = name;
    $modal.open({
      templateUrl: 'app/userProfile/userProfile.html',
      backdrop: true,
      windowClass: 'modal',
      controller: 'UserProfileController',
      resolve: {
        user: function () {
          return $scope.userName;
        }
      }
    });
  };
});
