angular.module('interim.userProfile', [])

.controller('UserProfileController', function ($scope, $modal, user, $firebaseObject, $rootScope, Auth) {
  ref = new Firebase("https://interim.firebaseio.com/UsersDB");
  var users = $firebaseObject(ref);
  var userKey = user+'-github';
  $scope.editAllowed = false;
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

  $scope.save = function() {
    Auth.updateUser(userKey, $scope.clickedUser);
  };

});