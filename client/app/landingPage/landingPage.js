angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Auth, Permissions, $state, $rootScope, $modal) {
  $scope.master = {};

  $scope.githubAuth = function() {
    Auth.githubAuth()
    .then(function(user){
      Auth.storeUser(user);
      $state.go('community-profile');
    });
  };

  $scope.signIn = function(community) {
    Auth.communitySignIn(community);
  };

  $scope.communityModal = function() {     
    $modal.open({
      templateUrl: 'app/landingPage/communitySignUp.html',
      backdrop: true,
      windowClass: 'modal-singUp',
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
  };

  $scope.reset = function() {
    $scope.community = {};
  };

  $scope.reset();
});
