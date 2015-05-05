angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Github, $state, $rootScope) {

  $scope.githubAuth = function(){
    Github.firePromise()
    .then(function(auth){
      $rootScope.user = auth.github.displayName;
      console.log($rootScope.user)
      $state.go('community');
    });
  };
});