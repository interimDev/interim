angular.module('interim.dashboard', ["firebase"])

.controller('DashboardController', function($scope, $firebaseArray, $rootScope) {

  var roomRef = new Firebase("https://interim.firebaseio.com/room-metadata");
  var privateRef = new Firebase("https://interim.firebaseio.com/private-metadata");
  // download the data into a local object
  $scope.rooms = $firebaseArray(roomRef);

  // var privateRooms = $firebaseArray(privateRef.child($rootScope.user));
  // privateRooms.$add({name: "privateTest"});

  // var newRoom = privateRef.push();

  // privateRoom = {
  //     id: newRoom.key(),
  //     //TODO: have to fix created by userid  when user is logged in
  //     createdByUserId: "anonymous:-JoQq9FpU-oOGmI7E4Mc",
  //     name: 'SecretRoom',
  //     type: 'private',
  //     createdAt: Firebase.ServerValue.TIMESTAMP
  //   };

  // newRoom.set(privateRoom);

  // $scope.privateRooms = $firebaseArray(privateRef);



        //$scope.rooms.concat(privateRooms);
      //}
  
  //console.log("rooms: ", $scope.rooms);

  //adding room
  $scope.add = function(event) {
   //getting user room name here;
    var roomName;

    bootbox.dialog({
      message: "Enter New Room Name:<input type='text' id='room_name'></input>",
      title: "Creating New Room",
      buttons: {
        main: {
          label: "Create",
          className: "btn-primary",
          callback: function() {
            roomName = $('#room_name').val();
            //creates entry
            var newRoom = roomRef.push();
            //create new room
            var room = {
              id: newRoom.key(),
              //TODO: have to fix created by userid when user is logged in
              createdByUserId: "anonymous:-JoQq9FpU-oOGmI7E4Mc",
              name: roomName,
              type: 'public',
              createdAt: Firebase.ServerValue.TIMESTAMP
            };
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

  //get all messages for specific room
  var userRef = new Firebase("https://interim.firebaseio.com/UsersDB");
  $scope.users = $firebaseArray(userRef);

});
