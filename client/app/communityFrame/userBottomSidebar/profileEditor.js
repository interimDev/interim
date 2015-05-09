angular.module('interim.profileEditor', [])

.controller('profileEditorController', function ($scope, $firebaseObject, $firebaseAuth) {
  //getting users current name from github
  var ref = new Firebase("https://interim.firebaseio.com/UsersDB");
  
  //Pulling the users from the UsersDB section of firebase
  var users = $firebaseObject(ref);
  //Here we want to find out the name of the user signed in so we may edit the proper user in our saveProfile function
  $scope.authObj = $firebaseAuth(ref);
  var authData = $scope.authObj.$getAuth();
  //Creating an empty profile object
  $scope.userProfile = {};

  $scope.saveProfile = function() {
    //Setting the name of the logged in user
    var name = authData.github.displayName + "-github";
    //Setting the users profile info object 
    var userObj = $scope.userProfile;
    //Updating firebase data with the new profile information
    ref.child(name).child('profile').update(userObj, function(error) {
      console.log("User update: ", $scope.userProfile);
    });
  };
});