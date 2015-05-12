angular.module('interim.yourCommunityList', ["firebase"])

.controller('YourCommunityListController', function ($scope, $firebaseObject, $rootScope, $state) {
  // Initially identifying user and displaying their current groups & communities

  var ref = new Firebase("https://interim.firebaseio.com/CommunityDB/");
  var commObj = $firebaseObject(ref);
  $scope.userInfo = $rootScope.userInfo;

  // For each of these calls, userId needs to be in the form
  // userName-authSource   // Yoda-github
  $scope.usersCommunities = function(){

    var userId = '' + $scope.userInfo.name + "-" + $scope.userInfo.auth.provider;

    $scope.communities = $firebaseArray(ref.child('UsersDB').child(userId).child('usersCommunities'));
    console.log("Retrieved ", $scope.userInfo.name, "'s communities: ", communities);

  };

  $scope.usersGroups = function(){
    //Check all Group children for all communities
    $scope.groups = $firebaseArray(ref.child('UsersDB').child(userId).child('usersGroups'));

  };


  $scope.displayUsersCommunities= function(){
    //Use $rootscope array of communties

  };
  $scope.displayUsersGroups= function(){
    //Use $rootscope array of communties
  };


  // Seach and display results
  $scope.searchCommunities = function(searchTerm) {
  };
  $scope.searchGroups = function(searchTerm) {
  };
  $scope.displayResults = function(searchTerm) {
  };

  // Selecting groups or communities after search results to request permission

  $scope.selectCommunities = function(){
  };
  $scope.selectGroups = function(){
  };

  $scope.sendSearch = function(community) {
    console.log("entered sendSearch");
    searchName = community.toLowerCase();

    commObj.$loaded().then(function() {
      var keepGoing = true;
      $scope.communitiesObj = commObj;
      angular.forEach($scope.communitiesObj, function(value, key) {
        if(keepGoing) {
          if(value.name === searchName) {
            //TODO - APPEND THE REQUESTED COMMUNITY TO THE PAGE
            //THIS IS THE OBJECT OF THE REQUESTED COMMUNITY
            $scope.requestedCommunity = value;
            $rootScope.communityInfo = value;
            console.log("state to go: ", value)
            $state.go("community-profile", {communityName: value['name']})
            keepGoing = false;
          }
        }
      });
    });
  };
});
