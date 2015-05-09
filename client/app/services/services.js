angular.module('interim.services', [])

.factory('Auth', function ($firebaseAuth, $rootScope, Permissions) {
  var ref = new Firebase("https://interim.firebaseio.com/");
  var authObj = $firebaseAuth(ref);
  

  /* 
  =================================
            USER AUTH
  =================================
  */


  //sends the OAth request to github through 
  //and turns the results into a promise
  var githubAuth = function () {
    return authObj.$authWithOAuthPopup("github").then(function(authData) {
      console.log("Logged in as:", authData.uid);
      return authData
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }

  // adding new users to the database.
  // To-do: Data will need be to be validated when storing to datebase.
  // user argument should be a completed object
  var storeUser = function(user){
    //pulls data from the github user data to create a cleaner
    //filtered user object that we insert to the database
    filteredUser = {
      'name' : user.github.displayName,
      'id' : user.github.id,
      'token' : user.token,
      'auth' : user.auth,
      'communities' : null,
      'permissions' : null,
      'avi_url' : user.github.cachedUserProfile.avatar_url
      }

    //users are stored in the database by their name and auth provider
    // example - "Trace Thompson-github"
    var username = user.github.displayName+"-"+user.provider;
    var userObj = {};
    userObj[username] = filteredUser;

    ref.child('UsersDB').update(userObj , function(error) {
      error ? console.log("Error inserting user: ", error) : console.log("user inserted: ", userObj[username]);
    })
    Permissions.isSuperAdmin();
    //set userInfo for reference in front end
    $rootScope.userInfo = userObj[username];
  }


  /* 
  =================================
          COMMUNITY AUTH
  =================================
  */


  //authorizes a community by their name and email
  var communityAuth = function(community) {
    var ref = new Firebase("https://interim.firebaseio.com/");
    var authObj = $firebaseAuth(ref);

    return authObj.$createUser({
      email: community.email,
      password: community.password
    }).then(function(userData) {
      console.log("Community created with uid: " + userData.uid);
      return storeCommunity(userData, community);
    }).catch(function(error) {
      console.log("Error creating community: ", error);
    });
  }

  // adds community to the database
  var storeCommunity = function(authObj, communityObj){
    //communities are currently stored in the database by their uid
    var uid = authObj.uid;
    var temp = {};
    var filteredCommunity = {
      name: communityObj.name,
      founder: null,
      foundingDate: Firebase.ServerValue.TIMESTAMP,
      groups: {},
      location: null,
      privacy: true,
      email: communityObj.email,
      password: communityObj.password,
      avi_url: null,
      bio: null
    }
    temp[uid] = filteredCommunity;

    ref.child('CommunityDB').update(temp , function(error) {
      error ? console.log("Error inserting community: ", error) : console.log("community inserted: ", temp[uid]);
    })
    $rootScope.currentCommunity = temp[uid];
    communitySignIn(temp[uid])
  }

  // logs in the communities 
  // called directly after authorizaition
  var communitySignIn = function(community){

    authObj.$authWithPassword({
      email: community.email,
      password: community.password
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
  

  /* 
  =================================
            END OF AUTH 
  =================================
  */

  return {
    communitySignIn: communitySignIn,
    githubAuth: githubAuth,
    storeUser: storeUser,
    communityAuth: communityAuth
  }
})
.factory('Permissions', function ($rootScope) {
  var ref = new Firebase('https://interim.firebaseio.com/');

  //determines if user is a super admin by
  //querying the db and checking if the username exists
  //returns true or false value
  var isSuperAdmin = function(){
    ref.child('superAdmin').on("value", function(snapshot) {
      var superAdminObj = snapshot.val();
      var user = $rootScope.userInfo;
      var userKey = user.name+"-"+user.auth.provider
      $rootScope.superAdmin = superAdminObj[userKey] ? true : false;
      console.log($rootScope.superAdmin, " - super admin")
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }


  return {
    isSuperAdmin : isSuperAdmin
  }
})