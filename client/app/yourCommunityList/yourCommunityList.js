angular.module('interim.yourCommunityList', ["firebase"])

.controller('YourCommunityListController', function ($scope, $firebaseObject, $rootScope, $state) {
  // Initially identifying user and displaying their current groups & communities

  var ref = new Firebase("https://interim.firebaseio.com/");
  var communityRef = new Firebase("https://interim.firebaseio.com/CommunityDB/");
  var Communities = $firebaseObject(communityRef);
  $scope.userInfo = $rootScope.userInfo;

  // For each of these calls, userId needs to be in the form
  // userName-authSource   // Yoda-github
  $scope.usersCommunities = function(){

    var userId = '' + $scope.userInfo.name + "-" + $scope.userInfo.auth.provider;
    var communitiesObj = $firebaseObject(ref.child('UsersDB').child(userId).child('usersCommunities'));

    //var commObj = $firebaseObject(ref.child('UsersDB').child(userId)); //Contains communities & groups
    // Currently stores user's communities as {communityName1: true, communityName2: true}

    $scope.communities = communitiesObj;


    // to take an action after the data loads, use $loaded() promise
    communitiesObj.$loaded().then(function() {
        console.log("Loaded records ", communitiesObj);

      angular.forEach($scope.communities, function(value,key){
        // Key is in communitiesObj (retrieved from UserDB), should be relatively small
        // Need to search communitySnapshot[key].name === key
        // Need to seach communitiesObj keys's
        if( Communities[key] ) {
          communitiesObj[key] = Communities[key];
        }
      });
    });
  };

  $scope.usersCommunities();

  $scope.usersGroups = function(){
    //Check all Group children for all communities
    $scope.groups = $firebaseArray(ref.child('UsersDB').child(userId).child('usersGroups'));
  };

  $scope.sendSearch = function(community) {
    searchName = community.toLowerCase();

    Communities.$loaded().then(function() {
      var keepGoing = true;
      $scope.communitiesObj = Communities;
      angular.forEach($scope.communitiesObj, function(value, key) {
        if(keepGoing) {
          if(value.name === searchName) {
            //TODO - APPEND THE REQUESTED COMMUNITY TO THE PAGE
            //THIS IS THE OBJECT OF THE REQUESTED COMMUNITY
            $scope.requestedCommunity = value;
            $state.go("community-profile", {communityName: value.name});
            keepGoing = false;
          }
        }
      });
    });
  };


});
