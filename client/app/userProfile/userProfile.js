angular.module('interim.userProfile', [])

.controller('UserProfileController', function ($scope, $modal, user, $firebaseObject, $rootScope, Auth) {
  ref = new Firebase("https://interim.firebaseio.com/UsersDB");
  var users = $firebaseObject(ref);
  var userKey = user+'-github';
  $scope.editAllowed = false;
  $scope.editorEnabled = false;
  $scope.makeProfile = false;

  users.$loaded().then(function() {
    $scope.data = users;
    $scope.clickedUser = $scope.data[userKey];
  });

  $scope.checkUser = function(){
    if($rootScope.userInfo.id === $scope.clickedUser.id) {
      $scope.editAllowed = true;

      //checks if user has a profile
      if (!$scope.clickedUser.profile) {
        $scope.makeProfile = true;
        $scope.clickedUser.profile = {};
      }
    }
  };

  $scope.editProfile = function() {
    $scope.editorEnabled = true;
  };

  $scope.cancel = function() {
    $scope.editorEnabled = false;
  };
    
  $scope.save = function(edits) {
    $scope.edits = angular.copy(edits);
    $scope.clickedUser.profile.location =  $scope.edits.location ? $scope.edits.location : $scope.clickedUser.profile.location;
    $scope.clickedUser.profile.bio = $scope.edits.bio ? $scope.edits.bio : $scope.clickedUser.profile.bio;
    $scope.clickedUser.profile.twitter = $scope.edits.twitter ? $scope.edits.twitter : $scope.clickedUser.profile.twitter;
    $scope.clickedUser.profile.linkedIn = $scope.edits.linkedIn ? $scope.edits.linkedIn : $scope.clickedUser.profile.linkedIn;
    $scope.cancel();
    Auth.updateUser(userKey, $scope.clickedUser);
  };

});
