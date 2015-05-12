angular.module('interim.superAdmin', ["firebase"])

.controller('SuperAdminController', function ($scope, $firebaseObject, $rootScope) {
  var ref = new Firebase("https://interim.firebaseio.com/CommunityDB/");
  var newCommunity = $firebaseObject(ref);
  $scope.communities = {};

  ref.on("child_added", function(snapshot) {
    var newCommunity = snapshot.val();
    var uid = newCommunity.id;
    if(!newCommunity.valid){
      $scope.communities[uid] = snapshot.val();
    }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


  //community is accepted 
  $scope.acceptCommunity = function(community) {
    console.log("acceptComm: ", community); 
    var uid = community.id;
    // valid attribute is set to true
    ref.child(uid).update({valid : true}, function(error) {
      if(error) {
        console.log("Error updating community: ", error);
      }
      else {
        //prevents community from showing up on admin page again
        $scope.communities[uid].valid = true;
        $scope.$apply();
      } 
    });
  };

  //if denied notify them by email or something and delete them from the db
  $scope.denyCommunity = function(community) {
    var uid = community.id;
    ref.child(uid).remove();
    $scope.communities[uid].valid = true;
    $scope.$apply();
  };
});