angular.module('interim.userBottomSidebar', ["firebase"])

.controller('BottomSidebarController', function ($scope, $rootScope) {
  //getting users current name from github
 $scope.userName = $rootScope.user.displayName;
 //getting users current image from github
 $scope.profileImage = $rootScope.userInfo.avatar_url;
  
});