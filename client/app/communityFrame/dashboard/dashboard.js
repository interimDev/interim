angular.module('interim.dashboard', ["firebase"])

.controller('DashboardController', function($scope, $firebaseArray, $rootScope) {

  var roomRef = new Firebase("https://interim.firebaseio.com/room-metadata");
  //display room names
  var rooms = $firebaseArray(roomRef);
  // $scope.rooms = $firebaseArray(roomRef);

  //current user id
  $scope.userID = $rootScope.user.id;
  $scope.rooms = rooms;
  //adding room
  $scope.add = function(event) {
   //getting user room name here;
    var roomName, roomType = 'public';
    
    bootbox.dialog({
      // input box for room name and set room to public
      message: "Enter New Room Name: <input type='text' id='room_name'></input>" + 
      "<div><label><input type='checkbox' id = 'checkbox'> Private Room</label></div>",
      title: "Creating New Room",
      buttons: {
        main: {
          label: "Create",
          className: "btn-primary",
          callback: function() {
            roomName = $('#room_name').val();
            //if checked then set room to private
            if($("#checkbox").is(':checked') === true) {
              roomType = 'private';
            }
            //creates entry
            var newRoom = roomRef.push();
            //create new room
            var room = {
              id: newRoom.key(),
              createdByUserId: $rootScope.user.id,
              name: roomName,
              type: roomType,
              users: "undefined",
              createdAt: Firebase.ServerValue.TIMESTAMP
            };
            //if room is private add id of user
            if (roomType === 'private') {
              room.users = $rootScope.user.id;
            }

            //sets data
            newRoom.set(room, function(error) {
                // room successfully created
            });
          }
        }
      }
    });
  }

  //get current room name
  $scope.roomName = function(obj) {
    //set current room (since no user just storing it globally)
    $rootScope.displayMessages(obj.room.id);
  }
  
  // //get all messages for specific room
  // var userRef = new Firebase("https://interim.firebaseio.com/user-names-online");
  // $scope.users = $firebaseArray(userRef);

  var userRef = new Firebase("https://interim.firebaseio.com/UsersDB");
  $scope.users = $firebaseArray(userRef);

});
