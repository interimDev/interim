angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Github, Utilities, $state, $rootScope) {

  $scope.githubAuth = function(){
    Github.firePromise()
    .then(function(userObj){
      $rootScope.userInfo = auth.github.cachedUserProfile;
      $rootScope.user = userObj.github.displayName;
      Utilities.createUser(userObj);
      $state.go('community');
    });
  };
});