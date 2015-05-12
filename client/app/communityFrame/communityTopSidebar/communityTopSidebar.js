angular.module('interim.communityTopSidebar', [])

.controller('TopSidebarController', function ($scope, $rootScope) {
  //get name for current group
  $scope.name = $rootScope.group.name;
});