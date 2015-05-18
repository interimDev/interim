angular.module('interim.services', [])

.factory('Auth', function ($firebaseAuth, $rootScope, Permissions, $state, $firebaseObject, $firebase) {
  var ref = new Firebase("https://interim.firebaseio.com/");
  var authObj = $firebaseAuth(ref);
  var commRef = new Firebase("https://interim.firebaseio.com/CommunityDB/");
  var communityObjects = $firebaseObject(commRef);
  var userRef = new Firebase("https://interim.firebaseio.com/UsersDB/");
  var allUsers = $firebaseObject(userRef);
  

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
      return authData;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  // adding new users to the database.
  var storeUser = function(user){
    //pulls data from the github user data to create a cleaner
    //filtered user object that we insert to the database
    var username = user.github.displayName+"-"+user.provider;
    var filteredUser = {
      'name' : user.github.displayName,
      'id' : username,
      'token' : user.token,
      'auth' : user.auth,
      'communities' : null,
      'permissions' : null,
      'avi_url' : user.github.cachedUserProfile.avatar_url,
      'profile' : {}
      };
    var userObj = {};
    userObj[username] = filteredUser;
      
    ref.child('UsersDB').on("value", function(snapshot) {
      var users = snapshot.val();
      //check to see if user exists already
      //if not then add them to the db
      if(!users[username]) {
        ref.child('UsersDB').update(userObj , function(error) {
          if (error) {
            console.log("Error inserting user: ", error);
          } else {
            console.log("user inserted: ", userObj[username]);
          }
        });
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    //set userInfo for reference in front end
    Permissions.isSuperAdmin();
    $rootScope.userInfo = allUsers[username];
  };

  var updateUser = function(key, edits) {
    console.log("edits: ", edits);
    ref.child('UsersDB').child(key).update(edits, function(error) {
      if (error) {
        console.log("Error updating user: ", error);
      } else {
        console.log("user updated");
      }
    });
  };


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
      $.notify("Community Request Recieved", "success");
      return storeCommunity(userData, community);
    }).catch(function(error) {
      console.log("Error creating community: ", error);
    });
  };


  // adds community to the database
  var storeCommunity = function(authObj, communityObj){
    //communities are currently stored in the database by their uid
    var uid = authObj.uid;
    var temp = {};
    var lowerName = communityObj.name.toLowerCase();
    var filteredCommunity = {
      id: uid,
      name: lowerName,
      founder: null,
      foundingDate: Firebase.ServerValue.TIMESTAMP,
      groups: {},
      location: null,
      privacy: true,
      email: communityObj.email,
      password: communityObj.password,
      avi_url: null,
      valid: false,
      bio: null
    };
    temp[uid] = filteredCommunity;

    ref.child('CommunityDB').update(temp , function(error) {
      if (error) {
        console.log("error inserting community: ");
      } else {
        console.log("community inserted: ", temp[uid]);
      }
    });
    $rootScope.communityInfo = temp[uid];
  };

  // logs in the communities 
  // called directly after authorizaition
  var communitySignIn = function(community){
    authObj.$authWithPassword({
      email: community.email,
      password: community.password
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      retrieveCommunity(authData.uid);
    }).catch(function(error) {
       $.notify("Email or Password is invalid", "error");
      console.error("Authentication failed:", error);
    });
  };
  
  var retrieveCommunity = function(communityId) {
    ref.child('CommunityDB').on("value", function(snapshot) {
      var communities = snapshot.val();
      communityInfo = communities[communityId];
      $rootScope.communityInfo = communityInfo;
      $state.go('community-profile', {communityName: communityInfo.name});
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };

  var queryCommunityDB = function(name) {
    var setName = name;
    var keepGoing = true;
    var result;
    return communityObjects.$loaded().then(function (){
      angular.forEach(communityObjects, function(value, key) {
        if(keepGoing) {
          if(value.name === name) {
            keepGoing = false;
            result = value;
          }
        }
      }); 
      return result;
    });
  };

  var joinCommunity = function(user, community) {
    var userId = user.id;
    var communityUpdate = {};
    communityUpdate[user.id] = user.name;
    var userUpdate = {};
    userUpdate[community.id]  = true;

    userRef.child(userId).child('usersCommunities').update(userUpdate, function(error) {
      error ? console.log("Error joining community: ",error) : console.log("You're now a member of "+community.name);
    });

    commRef.child(community.id).child('users').update(communityUpdate, function(error) {
      error ? console.log("Error adding user: ",error) : console.log(user.name+" is now a member!");
    });
  };

  var updateCommunity = function (community) {
    commRef.child(community.id).update(community, function(error) {
      if (error) {
        console.log("Error updating community: ", error);
      } else {
        console.log("community updated");
      }
    });
  }

  return {
    communitySignIn: communitySignIn,
    githubAuth: githubAuth,
    storeUser: storeUser,
    communityAuth: communityAuth,
    updateUser: updateUser,
    queryCommunityDB: queryCommunityDB,
    joinCommunity: joinCommunity,
    updateCommunity: updateCommunity
  };
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
      var userKey = user.name+"-"+user.auth.provider;
      $rootScope.superAdmin = superAdminObj[userKey] ? true : false;
      console.log("You're a SuperAdmin!");
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };


  return {
    isSuperAdmin : isSuperAdmin
  };
});