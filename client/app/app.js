// Declare app level module which depends on views, and components
angular.module('interim', [
  'ngRoute',
  'interim.communityFrame',
  'interim.landingPage',
  'interim.nav',
  'interim.services',
  'interim.userProfile',
  'interim.yourCommunityList'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/land', {
    templateUrl: './client/app/landingPage/landingPage.html',
    controller: 'LandingPageController'
  });
}]);