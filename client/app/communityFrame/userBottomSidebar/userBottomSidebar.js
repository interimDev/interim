angular.module('interim.userBottomSidebar', ["firebase"])

.controller('BottomSidebarController', function ($scope, $rootScope) {
  //getting users current name from github
  //set users name
 $scope.userName = $rootScope.userInfo ? $rootScope.userInfo.name : $rootScope.communityInfo.name;
 //getting users current image from github
 $scope.profileImage = $rootScope.userInfo ? $rootScope.userInfo.avi_url : null;
  
});