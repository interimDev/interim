angular.module('interim.services', [])

.factory('Github', function ($q) {
  // Your code here
  
  //This sends the OAth request to github through firebase's 
  //native functionalities and turns the results into a promise
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
.factory('Utilities', function ($q) {
  var dataRef = new Firebase('https://interim.firebaseio.com/');

  // Initalize main folders in database
  //dataRef.set('CommunityDB');
  //dataRef.set('UsersDB');

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
    console.log("factory user ",user)
    //username
    //userID
    //picture
    //bio
    //admin
    var userObj = {};
    var dbName = user.github.displayName;
    userObj[dbName] = user;

    //dataRef.child('UsersDB').push(user);
    dataRef.child('UsersDB').update( userObj , function(error){
      if(!error){
        console.log("user inserted!")
      }
      else{
        console.log(error);
      }
    })
  }

  return {
    createUser: createUser
  }
})