angular.module('interim.communityProfile', [])

.controller('CommunityProfileController', function ($scope, $firebaseArray, $rootScope, $state, $firebaseObject, community, $modal, Auth) {
  var userCurrentID = $rootScope.userInfo ? $rootScope.userInfo.id : $rootScope.communityInfo.id;
  var dbRef = new Firebase("https://interim.firebaseio.com/");

  $scope.allUsers = $firebaseArray(dbRef.child("UsersDB"));
  $scope.allUsersObj = $firebaseObject(dbRef.child("UsersDB"));
  $scope.groups = $firebaseArray(dbRef.child("community-groups-metadata"));
  $scope.community = community;
  $scope.users = $scope.community.users;
  $scope.user = $rootScope.userInfo;
  $scope.editAllowed = false;
  $scope.makeProfile = false;
  $scope.joinHide = true;
  console.log("community.///",community);

  $scope.save = function() {
    Auth.updateCommunity($scope.community);
  };

  $scope.checkUser = function(){
    if(userCurrentID === $scope.community.id) {
      $scope.editAllowed = true;

      //checks if user has a profile
      if (!$scope.community.profile) {
        $scope.makeProfile = true;
        $scope.community.profile = {};
      }
    }


    var groups = $firebaseObject(dbRef.child('UsersDB').child(userCurrentID).child('usersCommunities'));
    groups.$loaded().then(function() {
      var id = community.id;
      $scope.joinHide = groups[id] === true ? false : true; 
    });
  };

  //current user for private groups
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
    newUsers[user.id]= user.id;
    dbRef.child("community-groups-metadata").child($scope.usersGroup).child("usersList").update(newUsers);
    $.notify(user.name +" is added to group", "success");
  };


  //this function creates a popup modal with the users information
  $scope.userModal = function(user) {
    var name = user.name;   
    $scope.userName = name;
    $modal.open({
      templateUrl: 'app/userProfile/userProfile.html',
      backdrop: true,
      windowClass: 'modal',
      controller: 'UserProfileController',
      resolve: {
        user: function () {
          return $scope.userName;
        }
      }
    });
  };
});
