angular.module('interim.yourCommunityList', ["firebase"])

.controller('YourCommunityListController', function ($scope, $firebaseObject, $rootScope, $state) {
  // Initially identifying user and displaying their current groups & communities

  var ref = new Firebase("https://interim.firebaseio.com/");
  var commObj = $firebaseObject(ref);
  $scope.userInfo = $rootScope.userInfo;

  // For each of these calls, userId needs to be in the form
  // userName-authSource   // Yoda-github
  $scope.usersCommunities = function(){

    var userId = '' + $scope.userInfo.name + "-" + $scope.userInfo.auth.provider;

    var commObj = $firebaseObject(ref.child('UsersDB').child(userId).child('usersCommunities'));
    //var commObj = $firebaseObject(ref.child('UsersDB').child(userId)); //Contains communities & groups
    //$scope.communities = $firebaseArray(ref.child('UsersDB').child(userId).child('usersCommunities'));



    // Currently stores user's communities as {communityName1: true, communityName2: true}
    // Can set object in place of each true with following properties (at min), or full communitry profile:
    // avi_url: http://.........png   // To display icon
    // route: #/id/                   // Route to jump directly to community page

    //var tempObjInfo = $firebaseObject(ref.child('CommunityDB').

    var communitySnapshot;

     ref.child('CommunityDB').on("value", function(snapshot) {
        communitySnapshot = snapshot.val();
        //console.log("Snapshot:", snapshot.val(), " as saved in cS: ", communitySnapshot);
        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
     });

    for (var key in communitySnapshot){
      // To-Do check what's in communitySnapshot
      // Need to distinguish between the userKeys (group names) and the communityKeys (random IDs)
      // If the .name = one of the communities from the UserDB, save entire community object

      //var tempObjInfo = $firebaseObject(ref.child('CommunityDB')); // to-do: finish reference
      // Add the community object properties to the user's specific communities object
      if( commObj.hasOwnProperty( communitySnapshot[key].name ) ){     //To-Do check what's in communitySnapshot
        //
        commObj[key] = communitySnapshot[key]

      }
    }


    console.log($scope.userInfo.name, "'s communities ", $scope.communities);

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

  }


  $scope.displayResults = function(searchTerm) {
  };

});
