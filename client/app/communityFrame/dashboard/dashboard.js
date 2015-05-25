angular.module('interim.dashboard', ["firebase"])

.controller('DashboardController', function($scope, $firebaseArray, $firebaseObject, $rootScope, $modal, $state) {

  var dbRef = new Firebase("https://interim.firebaseio.com/");

  //display room names
  $scope.rooms = $firebaseArray(dbRef.child("room-metadata"));
  //get all users
  $scope.allUsers = $firebaseArray(dbRef.child("UsersDB"));
  //get all communities
  $scope.communities = $firebaseObject(dbRef.child("CommunityDB"));
  //current user id
  $scope.user = $rootScope.userInfo ? $rootScope.userInfo: $rootScope.communityInfo;
  //current groups
  $scope.currentGroup = $rootScope.group;
  //setting current community
  $scope.communityID  = $scope.currentGroup.createdByUserId;
  //accessing the current communities url information
  $scope.currentCommunityAvi = $firebaseObject(dbRef.child("CommunityDB").child($scope.communityID).child("avi_url"));
  $scope.currentCommunity = $firebaseObject(dbRef.child("CommunityDB").child($scope.communityID));


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

  $scope.routeMe = function() {
    $state.go('community-profile', {communityName: $scope.currentCommunity.name});
  };

  //add room to db
  $scope.createRoom = function(roomInfo) {
    $scope.master = angular.copy(roomInfo);
    var newRoom = dbRef.child("room-metadata").push();
    var currentUsers = {};

    if(roomInfo.private) {
      currentUsers[$scope.user.id] = $scope.user.id;
    }

    var room = {
      id: newRoom.key(),
      createdByUserId: $scope.user.id,
      name: $scope.master.name,
      type: $scope.master.private ? 'private' : 'public',
      usersList: currentUsers,
      createdAt: Firebase.ServerValue.TIMESTAMP,
      groupid: $scope.currentGroup.id
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
    if (room.type === "public" && room.groupid === $scope.currentGroup.id) {
      return true;
    }
  };

  //filter private rooms for current user
  $scope.filterPrivate = function(room) {
    if (room.type === "private" && room.groupid === $scope.currentGroup.id) {
      for (var val in room) {
        for (var id in room[val]) {
          //if users members match current users id then allow user to see room
          if (room[val][id] === $scope.user.id) {
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
    $rootScope.messages(obj.room);
  };

  //if there is no room get first room
  $scope.noRoom = true;
  $scope.firstRoom = function(obj) {
    if ($scope.noRoom) {
      $rootScope.messages(obj.room);
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

  //Current Group Name
  $scope.groupName = $scope.currentGroup.name;

  //getting users current image and name
  $scope.userName = $scope.user.name;
  $scope.profileImage = $scope.user.avi_url;

  $scope.userModal = function(user) {
    var name = user.name;   
    $scope.usersName = name;
    $modal.open({
      templateUrl: 'app/userProfile/userProfile.html',
      backdrop: true,
      windowClass: 'modal',
      controller: 'UserProfileController',
      resolve: {
        user: function () {
          return $scope.usersName;
        }
      }
    });
  };
});
