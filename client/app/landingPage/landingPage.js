angular.module('interim.landingPage', [])

.controller('LandingPageController', function ($scope, Github, Utilities, Permissions, $state, $rootScope, $modal) {

  $scope.githubAuth = function(){
    Github.firePromise()
    .then(function(userObj){
      var filteredUser = Utilities.createUser(userObj)

      //set all our root scope necessities here
      $rootScope.superAdmin = Permissions.isSuperAdmin(filteredUser);
      $rootScope.userInfo = userObj.github.cachedUserProfile;
      $rootScope.user = userObj.github;
      $state.go('community');
    })
  };

  $scope.signIn = function(community) {
    Auth.communitySignIn(community)
  }

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
    Utilities.createCommunity($scope.master);
  };

  $scope.reset = function() {
    $scope.community = {};
  };

  $scope.reset();
});
