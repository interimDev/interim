angular.module('interim.createGroup', [])

.controller('CreateGroupController', function ($scope, $rootScope, $firebaseObject, $modal, $modalInstance) {
  //TO-DO: change the modal buttons into here
  var communityGroupsRef = new Firebase("https://interim.firebaseio.com/community-groups-metadata");
  var userCurrentID = $rootScope.userInfo ? $rootScope.userInfo.id : $rootScope.communityInfo.id;
  
  $scope.createGroup = function(groupInfo) {
    $scope.master = angular.copy(groupInfo);
    $scope.master.private;
    var newGroup = communityGroupsRef.push();
    var currentUsers = {};
    
    if(groupInfo.private) {
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
        console.log("error setting group: ",error);
      }
      else {
        $scope.closeModal();
      }
    });
  };

  $scope.closeModal = function(){
     $modalInstance.close();
  };
});