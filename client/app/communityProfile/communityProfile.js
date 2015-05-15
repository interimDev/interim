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
<<<<<<< HEAD
    if (group.type === "public" && group.community === community.name) {
      return true;
=======
    communityName = $rootScope.communityInfo ? $rootScope.communityInfo.name : $scope.community.name;
    if (group.type === "public" && group.community === communityName) {
      return true;
>>>>>>> [feature] NavBar appearing and styled for community profile and user's communities
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

<<<<<<< HEAD

=======
  //get all Users
  var userRef = new Firebase("https://interim.firebaseio.com/UsersDB");
  $scope.allUsers = $firebaseArray(userRef);

>>>>>>> [feature] NavBar appearing and styled for community profile and user's communities
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


<<<<<<< HEAD
=======
  var communityRef = new Firebase("https://interim.firebaseio.com/CommunityDB/"+community.id);
  $scope.users = $firebaseArray(communityRef.child("users"));
  //get community picture
  $scope.communityPic = $scope.community;
  console.log($scope.communityPic);
>>>>>>> [feature] NavBar appearing and styled for community profile and user's communities
});
