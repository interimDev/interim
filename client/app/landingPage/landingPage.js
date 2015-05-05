angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Github, $state, $rootScope) {

  $scope.githubAuth = function(){
    Github.firePromise()
    .then(function(error, auth){
      $rootScope.user = auth.github.username;
      $state.go('community');
    });
  };
});