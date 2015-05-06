angular.module('interim.userBottomSidebar', ["firebase"])

.controller('BottomSidebarController', function ($scope, $rootScope) {
 //getting users current name
 $scope.userName = $rootScope.user.name;
 //getting users current image
 $scope.profileImage = $rootScope.user.avi_url;
});