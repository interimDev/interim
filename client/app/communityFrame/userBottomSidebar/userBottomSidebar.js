angular.module('interim.userBottomSidebar', ["firebase"])

.controller('BottomSidebarController', function ($scope, $rootScope) {
  //getting users current name from github
 $scope.userName = $rootScope.userInfo.name;
 //getting users current image from github
 $scope.profileImage = $rootScope.userInfo.avi_url;
  
});