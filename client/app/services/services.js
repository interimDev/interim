angular.module('interim.services', [])

.factory('Auth', function ($firebaseAuth, $rootScope, Permissions, $state) {
  var ref = new Firebase("https://interim.firebaseio.com/");
  var usersRef = new Firebase("https://interim.firebaseio.com/UsersDB/");
  var authObj = $firebaseAuth(ref);
  var usersObj = $firebaseAuth(usersRef) 
  

  /* 
  =================================
              USER 
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
    var username = user.github.displayName+"-"+user.provider;
    var filteredUser = {
      'name' : user.github.displayName,
      'id' : user.github.id,
      'token' : user.token,
      'auth' : user.auth,
      'communities' : null,
      'permissions' : null,
      'avi_url' : user.github.cachedUserProfile.avatar_url,
      'profile' : {}
      }
    var userObj = {};
    userObj[username] = filteredUser;
      
    //check to see if user exists already
    //if not then add them to the db
    if(!usersObj[username]) {
      ref.child('UsersDB').update(userObj , function(error) {
        error ? console.log("Error inserting user: ", error) : console.log("user inserted: ", userObj[username]);
      })
    }
    else { 
      console.log("user is already in the database");
    }
    //set userInfo for reference in front end
    Permissions.isSuperAdmin();
    $rootScope.userInfo = userObj[username];
  }

  var updateUser = function(key, edits) {
    console.log(key," edits in services: ", edits)
    ref.child('UsersDB').child(key).child('profile').update(edits['profile'], function(error) {
      error ? console.log("Error updating user: ", error) : console.log("user updated");
    })

  }


  /* 
  =================================
            COMMUNITY
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
    $rootScope.communityInfo = temp[uid];
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
      retrieveCommunity(authData.uid)
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
  
  var retrieveCommunity = function(communityId) {
    ref.child('CommunityDB').on("value", function(snapshot) {
      var communities = snapshot.val();
      communityInfo = communities[communityId]
      $rootScope.communityInfo = communityInfo;
      console.log($rootScope.communityInfo, " - being returned as com obj")
      $state.go('community-profile');
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  return {
    communitySignIn: communitySignIn,
    githubAuth: githubAuth,
    storeUser: storeUser,
    communityAuth: communityAuth,
    updateUser: updateUser
  }
})

  /* 
  =================================
            END OF AUTH 
  =================================
  */


.factory('Permissions', function ($rootScope) {
  var ref = new Firebase('https://interim.firebaseio.com/');

  /* 
  =================================
          ROUTING PERMISSIONS
  =================================
  */

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