// Declare app level module which depends on views, and components
angular.module('interim', [
  'ngRoute',
  'interim.communityFrame',
  'interim.landingPage',
  'interim.nav',
  'interim.services',
  'interim.userProfile',
  'inteirm.yourCommunityList'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: 'app/landingPage/landingPage.html'});
}]);