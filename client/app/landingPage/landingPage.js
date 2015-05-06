angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Github, Utilities, $state, $rootScope) {

  $scope.githubAuth = function(){
    Github.firePromise()
    .then(function(userObj){
      Utilities.createUser(userObj)
      $rootScope.userInfo = userObj.github.cachedUserProfile;
      $rootScope.user = userObj.github;
      $state.go('community');


      //if the user is an admin grant permissions to ~very~ rare super admin page
      //we actually wanna make this a factory function and refactor
      //the function to actually query the database and check if the
      //user has admin priveledges 
      if(userObj.github.displayName === "Trace Thompson"){
        $rootScope.permission = true
      }

    });
  };
});