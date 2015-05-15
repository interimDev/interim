angular.module('interim.userBottomSidebar', ["firebase"])

.controller('BottomSidebarController', function ($scope, $rootScope) {
  //getting user's current name from github
  //set user's name
 $scope.userName = $rootScope.userInfo ? $rootScope.userInfo.name : $rootScope.communityInfo.name;
 //getting user's current image from github
 $scope.profileImage = $rootScope.userInfo ? $rootScope.userInfo.avi_url : null;
  
});