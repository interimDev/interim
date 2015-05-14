angular.module('interim.communityProfile', [])

.controller('CommunityProfileController', function ($scope, $firebaseArray, $rootScope, $state, $firebaseObject, community, $modal, Auth) {
  $scope.community = community;
  $scope.user = $rootScope.userInfo;

  var communityGroupsRef = new Firebase("https://interim.firebaseio.com/community-groups-metadata");

  //show current groups
  var groups = $firebaseArray(communityGroupsRef), usersGroup, communityName;
  $scope.groups = groups;

  //current user for private groups
  var userCurrentID = $rootScope.userInfo ? $rootScope.userInfo.id : $rootScope.communityInfo.id;
  
  $scope.joinCommunity = function() {
    console.log("join community user: ",$scope.user);
    console.log("community to join: ", $scope.community);
    Auth.joinCommunity($scope.user, $scope.community);
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
    communityName = $rootScope.communityInfo ? $rootScope.communityInfo.name : $scope.community.name;
    if (group.type === "public" && group.community === communityName) {
      return true;  
    }
  };

  //filter private groups for community
  $scope.privateGroup = function(group) {
    if (group.type === "private" && group.community === communityName) {
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

  //get all Users 
  var userRef = new Firebase("https://interim.firebaseio.com/UsersDB");
  $scope.allUsers = $firebaseArray(userRef);
  
  //setting private group when user clicks on adding users
  $scope.selectingGroup = function(groupID) {
    usersGroup = groupID;
  };

  //adding user to private group
  $scope.addUser = function(user) {
    var newUsers = {};
    var selectedGroup = new Firebase("https://interim.firebaseio.com/community-groups-metadata");
    newUsers[user.id]= user.id;
    selectedGroup.child(usersGroup).child("usersList").update(newUsers);
    $.notify(user.name +" is added to group", "success");
  };

  //get each group
  $scope.getGroup = function(group) {
    //setting group in rootscope
    $rootScope.group = group;
    //sending user to profile page
    $state.go('community');
  };

  //We currently have the simple login id!
  //Next we need to find the group object containing the userCurrentID
  var communityRef = new Firebase("https://interim.firebaseio.com/CommunityDB/"+userCurrentID);
  $scope.users = $firebaseArray(communityRef.child("users"));
});
