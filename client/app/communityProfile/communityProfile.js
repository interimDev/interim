angular.module('interim.communityProfile', [])

.controller('CommunityProfileController', function ($scope, $firebaseArray, $rootScope, $stateParams, $state) {

  //get all groups for community
  var communityGroupsRef = new Firebase("https://interim.firebaseio.com/community-groups-metadata");

  //show current groups
  var groups = $firebaseArray(communityGroupsRef), usersGroup;
  $scope.groups = groups;

  //current user for private groups
  var userCurrentID = $rootScope.userInfo ? $rootScope.userInfo.id : $rootScope.communityInfo.id;

  //only communities can see add feature for groups
  if ($rootScope.communityInfo.id) {
    $("#addNewGroup").css('visibility', 'visible');
  }

  //adding group
  $scope.addGroup = function(event) {
  //user sets group name
    var groupName, groupType = 'public';
    bootbox.dialog({
      // input box for group name and set group to public or private
      message: "Enter New Group Name: <input type='text' id='group_name'></input>" + 
      "<div><label><input type='checkbox' id = 'checkbox' require> Private Group</label></div>",
      title: "Creating New Group",
      buttons: {
        main: {
          label: "Create Group",
          className: "btn-primary createRoomButton",
          callback: function() {
            if ($("#group_name").val()) {
              groupName = $('#group_name').val();
              //if checked then set group to private
              if($("#checkbox").is(':checked') === true) {
                groupType = 'private';
              }
              //creates entry
              var newGroup = communityGroupsRef.push();
              var currentUsers = {};
              //if group is private add id of user
              if (groupType === 'private') {
                currentUsers[$rootScope.communityInfo.id] = $rootScope.communityInfo.id;
              }
              //create new group
              var group = {
                id: newGroup.key(),
                createdByUserId: userCurrentID,
                name: groupName,
                type: groupType,
                usersList: currentUsers,
                createdAt: Firebase.ServerValue.TIMESTAMP,
                community: $rootScope.communityInfo.name
              };
              //success notification
              $.notify("Group Created", "success");
              //sets data
              newGroup.set(group, function(error) {
                //group is created
              });
            } else {
              //notify that group have not been created
              $.notify("Group is Invalid", "error");
            }
          }
        }
      }
    });
  };

  //filter public groups for community
  $scope.publicGroup = function(group) {
    if (group.type === "public" && group.community === $rootScope.communityInfo.name) {
      return true;  
    }
  };

  //filter private groups for community
  $scope.privateGroup = function(group) {
    if (group.type === "private" && group.community === $rootScope.communityInfo.name) {
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
  
  console.log("Here are the users: ", $scope.allUsers);

  //setting private group when user clicks on adding users
  $scope.selectingGroup = function(groupID) {
    console.log("GROUP ID",groupID);
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

  console.log("community obj: ",$rootScope.communityInfo);
  $scope.community = $rootScope.communityInfo;

});