angular.module('interim.dashboard', ["firebase"])

.controller('DashboardController', function($scope, $firebaseArray, $rootScope) {

  var ref = new Firebase("https://interim.firebaseio.com/room-metadata");
  // download the data into a local object
  $scope.rooms = $firebaseArray(ref);

  //adding room
  $scope.add = function(event) {
    //sweetprompt use it here
    var roomName =  prompt("Please enter new room name?");
    //creates entry
    var newRoom = ref.push();
    //create new room
    var room = {
      id: newRoom.key(),
      //TODO: have to fix created by userid  when user is logged in
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

  //get current room name
  $scope.roomName = function(obj) {
    //set current room (since no user just storing it globally)
    $rootScope.displayMessages(obj.room.id);
  }

});
