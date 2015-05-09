angular.module('interim.communityProfile', [])

.controller('CommunityProfileController', function ($scope, $firebaseArray, $rootScope) {
  // Your code here
  console.log("ugh comm obj: ",$rootScope.communityInfo)
  $scope.community = $rootScope.communityInfo
});