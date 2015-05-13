angular.module('interim.createGroup', [])

.controller('CreateGroupController', function ($scope, $rootScope, $firebaseObject, $modal, $modalInstance) {
  //to-do change the fucking modal buttons into here FUCK
  var communityGroupsRef = new Firebase("https://interim.firebaseio.com/community-groups-metadata");
  var userCurrentID = $rootScope.userInfo ? $rootScope.userInfo.id : $rootScope.communityInfo.id;
  
  $scope.createGroup = function(group) {
    $scope.master = angular.copy(group);
    $scope.master.private;
    console.log("private: ", $scope.master.private);
    var newGroup = communityGroupsRef.push();
    var currentUsers = {};
    
    if(group.private) {
      currentUsers[$rootScope.communityInfo.id] = $rootScope.communityInfo.id;
    }

    //create new group
    var group = {
      id: newGroup.key(),
      createdByUserId: $rootScope.communityInfo.id,
      name: $scope.master.name,
      type: $scope.master.private ? 'private' : 'public',
      usersList: currentUsers,
      createdAt: Firebase.ServerValue.TIMESTAMP,
      community: $rootScope.communityInfo.name
    };

    newGroup.set(group, function(error) {
      if(error) {
        console.log("error setting group: ",error)
      }
      else {
        $scope.closeModal();
      }
    });
  }

  $scope.closeModal = function(){
     $modalInstance.close();
  }
});