angular.module('interim.communityProfile', [])

.controller('CommunityProfileController', function ($scope, $firebaseArray, $rootScope, $stateParams) {
  //get all groups for community
   var communityGroupsRef = new Firebase("https://interim.firebaseio.com/community-groups-metadata");

   //show current groups
   var groups = $firebaseArray(communityGroupsRef);
   $scope.groups = groups;

   //adding group
   $scope.addGroup = function(event) {
   //user sets group name;
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
                createdByUserId: $rootScope.communityInfo.id,
                name: groupName,
                type: groupType,
                usersList: currentUsers,
                createdAt: Firebase.ServerValue.TIMESTAMP
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

  //get each group
  $scope.getGroup = function(group) {
    //setting group in rootscope
    $rootScope.group = group;
    //sending user to profile page
    $state.go('community');
  }

  console.log("community obj: ",$rootScope.communityInfo);
  $scope.community = $rootScope.communityInfo;

});