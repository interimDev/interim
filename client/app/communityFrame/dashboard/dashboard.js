angular.module('interim.dashboard', ["firebase"])

.controller('DashboardController', function($scope, $firebaseArray, $rootScope) {

  var roomRef = new Firebase("https://interim.firebaseio.com/room-metadata");
  //display room names
  var rooms = $firebaseArray(roomRef), usersRoom, usersAdded=[];

  //current user id
  $scope.userID = $rootScope.userInfo.id;
  $scope.rooms = rooms;
  //adding room
  $scope.addRoom = function(event) {
   //getting user room name here;
    var roomName, roomType = 'public';
    
    bootbox.dialog({
      // input box for room name and set room to public
      message: "Enter New Room Name: <input type='text' id='room_name'></input>" + 
      "<div><label><input type='checkbox' id = 'checkbox' require> Private Room</label></div>",
      title: "Creating New Room",
      buttons: {
        main: {
          label: "Create",
          className: "btn-primary createRoomButton",
          callback: function() {
            if ($("#room_name").val()) {
              roomName = $('#room_name').val();
              //if checked then set room to private
              if($("#checkbox").is(':checked') === true) {
                roomType = 'private';
              }
              //creates entry
              var newRoom = roomRef.push();
              var currentUsers = {};
              //if room is private add id of user
              if (roomType === 'private') {
                currentUsers[$rootScope.userInfo.id] = $rootScope.userInfo.id;
              }
              //create new room
              var room = {
                id: newRoom.key(),
                createdByUserId: $rootScope.userInfo.id,
                name: roomName,
                type: roomType,
                usersList: currentUsers,
                createdAt: Firebase.ServerValue.TIMESTAMP
              };
              //success notification
              $.notify("Room Created", "success");
              //sets data
              newRoom.set(room, function(error) {
                  // room successfully created
              });
            } else {
              //notify that room have not been created
              $.notify("Room Name is Invalid", "error");
            }
          }
        }
      }
    });
  };

  //setting private room when user clicks on adding users
  $scope.selectingRoom = function(roomID) {
    usersRoom = roomID;
  };

  //filter private rooms for current user
  $scope.filterPrivate = function(room) {
    if (room.type === "private") {
      for (var val in room) {
        for (var id in room[val]) {
          //if users members match current users id then allow user to see room
          if (room[val][id] === $rootScope.userInfo.id) {
            return true;
          }
        }
      }
    }
  };

  //adding user to private room
  $scope.addUser = function(user) {
    var newUsers = {};
    var selectedRoom = new Firebase("https://interim.firebaseio.com/room-metadata");
    newUsers[user]= user;
    selectedRoom.child(usersRoom).child("usersList").update(newUsers);
  };

  //get current room name
  $scope.roomName = function(obj) {
    //set current room (since no user just storing it globally)
    $rootScope.messages(obj.room.id);
  };

  //on click remove user from modal
  $scope.removeUser = function(userID, userName) {
    //success notification
    $.notify("User " + userName +" Added", "success");
    usersAdded.push(userID);
    for (var user =0; user < usersAdded.length; user++) {
      $('#'+usersAdded[user]).hide();
    }
  };

  // reset users list for modal
  $scope.updateUsersList =function(userID){
    for (var user =0; user < usersAdded.length; user++) {
      $('#'+usersAdded[user]).show();
    }
    usersAdded =[];
  };

  //get all users
  var userRef = new Firebase("https://interim.firebaseio.com/UsersDB");
  $scope.allUsers = $firebaseArray(userRef);
});
