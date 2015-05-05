angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Github, Utilities, $state, $rootScope) {

  $scope.githubAuth = function(){
    Github.firePromise()
    .then(function(userObj){
      console.log("user obj", userObj)
      Utilities.createUser(userObj);
      $rootScope.userInfo = userObj.github.cachedUserProfile;
      $rootScope.user = userObj.github;
      $state.go('community');
    });
  };
});