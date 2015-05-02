// Declare app level module which depends on views, and components
angular.module('interim', [
  'ui.router',
  'ui.bootstrap',
  'interim.communityFrame',
  'interim.landingPage',
  'interim.nav',
  'interim.services',
  'interim.userProfile',
  'interim.yourCommunityList'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin');

  $stateProvider
  .state('signin', {
    url: '/signin',
    templateUrl: './client/app/landingPage/landingPage.html'
  })
  .state('communities', {
    url: '/communities',
    templateUrl: './client/app/yourCommunityList/yourCommunityList.html'
  })
  .state('chat', {
    url: '/chat',
    templateUrl: './firechat/examples/anonymous/index.html'
  })
}]);