angular.module('interim.dashboard', ["firebase"])

.controller('DashboardController', function($scope, $firebaseArray, $rootScope, $modal) {

  var dbRef = new Firebase("https://interim.firebaseio.com/");

  //display room names
  $scope.rooms = $firebaseArray(dbRef.child("room-metadata"));
  //get all users
  $scope.allUsers = $firebaseArray(dbRef.child("UsersDB"));
  //current user id
  $scope.userID = $rootScope.userInfo ? $rootScope.userInfo.id : $rootScope.communityInfo.id;

  //$modal for creting new room
  $scope.addRoom = function(event) {
    $modal.rooms = $modal.open({
      templateUrl: 'app/communityFrame/dashboard/createRoom.html',
      backdrop: true,
      windowClass: 'roomModal',
      controller: 'DashboardController',
      resolve: {
        community: function () {
          return $scope.community;
        }
      }
    });
  };

  //add room to db
  $scope.createRoom = function(roomInfo) {
    $scope.master = angular.copy(roomInfo);
    var newRoom = dbRef.child("room-metadata").push();
    var currentUsers = {};

    if(roomInfo.private) {
      currentUsers[$scope.userID] = $scope.userID;
    }

    var room = {
      id: newRoom.key(),
      createdByUserId: $scope.userID,
      name: $scope.master.name,
      type: $scope.master.private ? 'private' : 'public',
      usersList: currentUsers,
      createdAt: Firebase.ServerValue.TIMESTAMP,
      groupid: $rootScope.group.id
    };

    newRoom.set(room, function(error) {
      if(error) {
        $.notify("Room Name is Invalid", "error");
      }
      else {
        $.notify("Room Created", "success");
        $modal.rooms.close();
      }
    });
  };

  //setting private room when user clicks on adding users
  $scope.selectingRoom = function(roomID) {
    $scope.usersRoom = roomID;
  };

  $scope.filterPublic = function(room) {
    if (room.type === "public" && room.groupid === $rootScope.group.id) {
      return true;
    }
  };

  //filter private rooms for current user
  $scope.filterPrivate = function(room) {
    if (room.type === "private" && room.groupid === $rootScope.group.id) {
      for (var val in room) {
        for (var id in room[val]) {
          //if users members match current users id then allow user to see room
          if (room[val][id] === $scope.userID) {
            return true;
          }
        }
      }
    }
  };

  //adding user to private room
  $scope.addUser = function(user) {
    var newUsers = {};
    newUsers[user.id]= user.id;
    dbRef.child("room-metadata").child($scope.usersRoom).child("usersList").update(newUsers);
    $.notify("User " + user.name +" Added", "success");
  };

  //get current room messages
  $scope.roomName = function(obj) {
    $rootScope.messages(obj.room.id);
  };

  //if there is no room get first room
  $scope.noRoom = true;
  $scope.firstRoom = function(obj) {
    if ($scope.noRoom) {
      $rootScope.messages(obj.room.id);
      //after getting first room chat messages, set to false
      $scope.noRoom = false;
    }
  };

  //on click add user to room
  $scope.removeUser = function(userID, userName) {
    //success notification
    $.notify("User " + userName +" Added", "success");
    $scope.usersAdded.push(userID);
  };
});
