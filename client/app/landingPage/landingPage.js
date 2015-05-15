angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Auth, Permissions, $state, $rootScope, $modal) {
  $scope.master = {};

  //authenticates user at sign in
  $scope.githubAuth = function() {
    Auth.githubAuth()
    .then(function(user){
      Auth.storeUser(user);
      $state.go('communities');
    });
  };

  $scope.signIn = function(community) {
    Auth.communitySignIn(community);
  };

  $scope.communityModal = function() {     
    $modal.win = $modal.open({
      templateUrl: 'app/landingPage/communitySignUp.html',
      backdrop: true,
      windowClass: 'modal-signUp',
      controller: 'LandingPageController',
      resolve: {
        community: function () {
          return $scope.community;
        }
      }
    });
  };

  $scope.update = function(community) {
    $scope.master = angular.copy(community);
    Auth.communityAuth($scope.master);
    $modal.win.close();
  };

  $scope.reset = function() {
    $scope.community = {};
  };

  $scope.reset();
});
