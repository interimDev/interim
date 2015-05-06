angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Github, Utilities, Permissions, $state, $rootScope) {

  $scope.githubAuth = function(){
    Github.firePromise()
    .then(function(userObj){
      var filteredUser = Utilities.createUser(userObj)

      //set all our root scope necessities here
      $rootScope.superAdmin = Permissions.isSuperAdmin(filteredUser);
      $rootScope.user = filteredUser;
      $state.go('community');

    });
  };
});