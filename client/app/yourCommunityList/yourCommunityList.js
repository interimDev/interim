angular.module('interim.yourCommunityList', ["firebase"])

.controller('YourCommunityListController', function ($scope, $firebaseObject, $rootScope, $state) {
  // Initially identifying user and displaying their current groups & communities

  var ref = new Firebase("https://interim.firebaseio.com/");
  var communitiesObj = $firebaseObject(ref);
  $scope.userInfo = $rootScope.userInfo;

  // For each of these calls, userId needs to be in the form
  // userName-authSource   // Yoda-github
  $scope.usersCommunities = function(){

    var userId = '' + $scope.userInfo.name + "-" + $scope.userInfo.auth.provider;

    var communitiesObj = $firebaseObject(ref.child('UsersDB').child(userId).child('usersCommunities'));
    //var commObj = $firebaseObject(ref.child('UsersDB').child(userId)); //Contains communities & groups

    // Currently stores user's communities as {communityName1: true, communityName2: true}
    // Can set object in place of each true with following properties (at min), or full communitry profile:
    // avi_url: http://.........png   // To display icon
    // route: #/id/                   // Route to jump directly to community page
    $scope.communities = communitiesObj;

    var communitySnapshot;

     ref.child('CommunityDB').on("value", function(snapshot) {
        communitySnapshot = snapshot.val();
        //console.log("Snapshot:", snapshot.val(), " as saved in cS: ", communitySnapshot);
        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
     });

    var searchName;
    for (var key in communitiesObj){
      // Key is in communitiesObj (retrieved from UserDB)
      // Need to find matching communities from communities DB and add their info
      // Need to distinguish between the userKeys (group names) and the communityKeys (random IDs)
      // If the .name = one of the communities from the UserDB, save entire community object

      // Trace's search
      //
      searchName = key.toLowerCase();

      communitiesObj.$loaded().then(function() {
        var keepGoing = true;
        angular.forEach($scope.communitiesObj, function(value, key) {
          if(keepGoing) {
            // if(value.name === searchName) {
            //   // Put all the community properties into the $scope.communities object
            //   $scope.communties[value] = value;
            //   console.log("Community info retrieved: ", value);
            //   keepGoing = false;
            // }
          }
        });
      });
      /// Trace's search
      }

    //console.log($scope.userInfo.name, "'s communities ", $scope.communities);
  };

  $scope.usersCommunities();

  $scope.usersGroups = function(){
    //Check all Group children for all communities
    $scope.groups = $firebaseArray(ref.child('UsersDB').child(userId).child('usersGroups'));
  };


  $scope.displayCommunities= function(){
    //Use $rootScope array of communties
  };
  $scope.displayUsersGroups= function(){
    //Use $rootScope array of communties
  };


  // Seach and display results
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
            console.log("state to go: ", value);
            $state.go("community-profile", {communityName: value.name});
            keepGoing = false;
          }
        }
      });
    });
  };


});
