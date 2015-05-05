angular.module('interim.userBottomSidebar', ["firebase"])

.controller('BottomSidebarController', function ($scope, $rootScope) {
  console.log($rootScope.user);
 
 $scope.userName = $rootScope.user;
  
});