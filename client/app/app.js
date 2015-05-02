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
  // $urlRouterProvider.otherwise('/signin');

  $stateProvider
  .state('signin', {
    url: '/signin',
    templateUrl: './client/app/landingPage/landingPage.html'
  })
  .state('communities', {
    url: '/communities',
    templateUrl: './client/app/yourCommunityList/yourCommunityList.html'
  })
  .state('community', {
    url: '/community',
    views: {
      '': { templateUrl: './client/app/communityFrame/communityFrame.html' },
      'communityTopSidebar@community': { templateUrl: './client/app/communityFrame/communityTopSidebar/communityTopSidebar.html' },
      'dashboard@community': { templateUrl: './client/app/communityFrame/dashboard/dashboard.html' },
      'userBottomSidebar@community': { templateUrl: './client/app/communityFrame/userBottomSidebar/userBottomSidebar.html' },
      'chat@community': { templateUrl: './client/app/communityFrame/chat/chat.html' }
    }
  })
  .state('exampleChat', {
    url: '/exampleChat',
    templateUrl: './firechat/examples/anonymous/index.html'
  })
}]);