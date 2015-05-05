angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, $rootScope) {
  // Your code here
  // This is where we will use guthub authentication
  // https://auth.firebase.com/v2/<YOUR-FIREBASE>/auth/github/callback

  var ref = new Firebase("https://interim.firebaseio.com");

  ref.authAnonymously(function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      //setting user in global scope
      $rootScope.user = authData.uid;
      alert("Welcome Anon!\n" +
            authData.uid
     );
    }
  });
});