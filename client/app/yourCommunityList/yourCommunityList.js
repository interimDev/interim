angular.module('interim.yourCommunityList', ["firebase"])

.controller('YourCommunityListController', function ($scope, $firebaseObject, $rootScope, $state) {
  // Initially identifying user and displaying their current groups & communities

  var ref = new Firebase("https://interim.firebaseio.com/");
  var communityRef = new Firebase("https://interim.firebaseio.com/CommunityDB/");
  var commObj = $firebaseObject(ref);
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
    console.log("User's communities scoped ", $scope.communities);
    console.log("Communities from CommunityDB: ", Communities);


    // to take an action after the data loads, use $loaded() promise
    communitiesObj.$loaded().then(function() {
        console.log("Loaded records ", communitiesObj);

      //To-do: not getting into this function...
      angular.forEach($scope.communities, function(value,key){
        console.log("Within communitiesObj in $scope search...key: ", key);
        // Key is in communitiesObj (retrieved from UserDB), should be relatively small
        // Need to search communitySnapshot[key].name === key
        // Need to seach communitiesObj keys's
        if( Communities[key] ) {
          console.log("Found community match: ", Communities[key], " as ", Communities[key].name);
          communitiesObj[key] = Communities[key];
          console.log("Set community info : ", communitiesObj[key]);
        }
      });
    });

    // Vanilla JS only access non-enumerable keys, bad!
    // for(var key in communitiesObj) {
    //   console.log("Test non-angular forEach: ", key, ': ', communitiesObj[key]);
    // };

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
