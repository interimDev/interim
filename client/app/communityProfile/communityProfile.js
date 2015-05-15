angular.module('interim.communityProfile', [])

.controller('CommunityProfileController', function ($scope, $firebaseArray, $rootScope, $state, $firebaseObject, community, $modal, Auth) {
  var userCurrentID = $rootScope.userInfo ? $rootScope.userInfo.id : $rootScope.communityInfo.id;
  var communityGroupsRef = new Firebase("https://interim.firebaseio.com/community-groups-metadata");
  var groups = $firebaseArray(communityGroupsRef);

  $scope.groups = groups;
  $scope.community = community;
  $scope.users = $scope.community['users'];
  $scope.user = $rootScope.userInfo;

  //current user for private groups

  var userCurrentID = $rootScope.userInfo ? $rootScope.userInfo.id : $rootScope.communityInfo.id;

  $scope.joinCommunity = function() {
    Auth.joinCommunity($scope.user, $scope.community);
  };

  //user will not be able to see add icon for groups
  var validateGroups = $rootScope.communityInfo ? $rootScope.communityInfo.id : false;
  //if community admin
  if (validateGroups) {
    $scope.addNewGroup = false;
  // else if user
  } else {
    $scope.addNewGroup = true;
  }

  //this function creates a popup modal allowing users to add groups
  $scope.groupModal = function() {
   $modal.open({
     templateUrl: 'app/createGroup/createGroup.html',
     backdrop: true,
     windowClass: 'modal',
     controller: 'CreateGroupController',
     resolve: {
       community: function () {
         return $scope.group;
       }
     }
   });
  };

  //filter public groups for community
  $scope.publicGroup = function(group) {
    if (group.type === "public" && group.community === community.name) {
      return true;

    }
  };

  //get each group
  $scope.getGroup = function(group) {
    //setting group in rootscope
    $rootScope.group = group;
    //sending user to profile page
    $state.go('community');
  };

  //filter private groups for community
  $scope.privateGroup = function(group) {
    if (group.type === "private" && group.community === community.name) {
      for (var val in group) {
        for (var id in group[val]) {
          //if users members match current users id then allow user to see room
          if (group[val][id] === userCurrentID) {
            return true;
          }
        }
      }
    }
  };


  //setting private group when user clicks on adding users
  $scope.selectingGroup = function(groupID) {
    $scope.usersGroup = groupID;
  };

  //adding user to private group
  $scope.addUser = function(user) {
    var newUsers = {};
    var selectedGroup = new Firebase("https://interim.firebaseio.com/community-groups-metadata");
    newUsers[user.id]= user.id;
    selectedGroup.child($scope.usersGroup).child("usersList").update(newUsers);
    $.notify(user.name +" is added to group", "success");
  };


});
