angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Auth, Permissions, $state, $rootScope, $modal) {

  $scope.githubAuth = function(){
    Auth.githubAuth()
    .then(function(user){
      Auth.storeUser(user)
      $state.go('community');
    })
  };

  $scope.master = {};

  //TODO - REROUTE TO COMMUNITY PAGE ON SUBMISSION OR SIGN IN AS USER
  $scope.communityModal = function() {     
    $modal.open({
      templateUrl: 'app/landingPage/communitySignUp.html',
      backdrop: true,
      windowClass: 'modal',
      controller: 'LandingPageController',
      resolve: {
        community: function () {
          return $scope.community;
        }
      }
    });
  }

  $scope.update = function(community) {
    $scope.master = angular.copy(community);
    console.log($scope.master);
    Auth.communityAuth($scope.master);
  };

  $scope.reset = function() {
    $scope.community = {};
  };

  $scope.reset();
});