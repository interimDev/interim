angular.module('interim.services', [])

.factory('Github', function ($q) {
  // Your code here
  
  //This sends the OAth request to github through firebase's 
  //native functionalities and turns the results into a promise
  var githubAuth = function () {
    var deferred = $q.defer();
    var ref = new Firebase("https://interim.firebaseio.com");
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
      console.log("github user obj ",auth);
    }, function(reason) {
      return reason
    });
  }

  return {
    firePromise: firePromise
  }
});