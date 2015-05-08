angular.module('interim.services', [])

.factory('Github', function ($q) {
  // Your code here
  
  //This sends the OAth request to github through firebase's 
  //native functionalities and turns the results into a promise

  //TODO -------REFACTOR TO ANGULAR FIRE INSTEAD OF Q PROMISES
  var githubAuth = function () {
    var deferred = $q.defer();
    var ref = new Firebase("https://interim.firebaseio.com/");
    var githubAuth = ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(authData);
      }
    })
    return deferred.promise;
  }

  //returns promise of authenticated user data to the controller
  var firePromise = function(){
    var githubPromisified = githubAuth();
    return githubPromisified.then(function(auth) {
      return auth;
    }, function(reason) {
      return reason;
    });
  }

  return {
    firePromise: firePromise
  }
})
.factory('Utilities', function ($q, $firebaseAuth, $rootScope) {
  var dataRef = new Firebase('https://interim.firebaseio.com/');
  // Shorthand to access stored data
  var communityRef = function(community) {
    return dataRef.child('CommunityDB').child(community);
  };
  var groupRef = function(group) {
    return dataRef.child('CommunityDB').child('group');
  };
  var usersRef = function(user){
    return dataRef.child('UsersDB');
  };


  // Creating Profiles adding to the database.
  // To-do: Data will need be to be validated when storing to datebase.
  // user argument should be a completed object
  var createUser = function(user){
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

    //dataRef.child('UsersDB').push(user);
    dataRef.child('UsersDB').update(userObj , function(error) {
      if(!error){
        console.log("user inserted!")
      }
      else{
        console.log(error);
      }
    })
    return userObj[username];
  }

  //creates a community authorized by their name and email
  //note - does not add to the database
  var createCommunity = function(community) {
    var ref = new Firebase("https://interim.firebaseio.com/");
    $rootScope.authObj = $firebaseAuth(ref);


    return $rootScope.authObj.$createUser({
      email: community.email,
      password: community.password
    }).then(function(userData) {
      console.log("User created with uid: " + userData.uid);
      console.log(userData," - userData")
      return addCommunity(userData, community);
    }).catch(function(error) {
      console.log("Error creating user: ", error);
    });
  }

  var addCommunity = function(authObj, communityObj){
    //communities are stored in the database by their uid
    var uid = authObj.uid;
    var temp = {};
    var filteredCommunity = {
      name: communityObj.name,
      founder: null,
      foundingDate: Firebase.ServerValue.TIMESTAMP,
      groups: {},
      location: communityObj.location,
      privacy: true,
      email: communityObj.email,
      password: communityObj.password,
      avi_url: communityObj.avi_url,
      bio: communityObj.bio
   }

    temp[uid] = filteredCommunity;

    //dataRef.child('UsersDB').push(user);
    dataRef.child('CommunityDB').update(temp , function(error) {
      if(!error){
        console.log("community inserted: ", temp)
      }
      else{
        console.log(error);
      }
    })
    $rootScope.currentCommunity = temp[uid];
  }

  return {
    createUser: createUser,
    createCommunity: createCommunity
  }
})
.factory('Permissions', function ($q, $rootScope) {
  var dataRef = new Firebase('https://interim.firebaseio.com/');

  //determines if user is a super admin by
  //querying the db and checking if the username exists
  //returns true or false value
  var isSuperAdmin = function(user){
    dataRef.child('superAdmin').on("value", function(snapshot) {
      var superAdminObj = snapshot.val();
      console.log(superAdminObj, user.name+"-"+user.auth.provider)
      if(superAdminObj[user.name+"-"+user.auth.provider] === true){
        console.log("You are super!")
        $rootScope.superAdmin = true;
      }
      else {
        $rootScope.superAdmin = false;
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }


  return {
    isSuperAdmin : isSuperAdmin
  }
})