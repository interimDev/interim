// Declare app level module which depends on views, and components
var App = angular.module('interim', [
  'ui.router',
  'ui.bootstrap',
  'interim.communityFrame',
  'interim.landingPage',
  'interim.nav',
  'interim.services',
  'interim.userProfile',
  'interim.yourCommunityList',
  'interim.dashboard',
  'interim.chat',
  'interim.userBottomSidebar',
  'interim.userProfile'
]);
//global variable for current room id and user
App.run(function($rootScope){
  $rootScope.user;
  $rootScope.userInfo;

});


App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/signin');
  $stateProvider
  .state('signin', {
    url: '/signin',
    controller: 'LandingPageController',
    templateUrl: '/app/landingPage/landingPage.html'
  })
  .state('communities', {
    url: '/communities',
    templateUrl: '/app/yourCommunityList/yourCommunityList.html'
  })
  .state('userprofile', {
    url: '/user',
    templateUrl: '/app/userProfile/userProfile.html'
  })
  .state('community', {
    url: '/community',
    views: {
      '': { templateUrl: '/app/communityFrame/communityFrame.html' },
      'communityTopSidebar@community': { templateUrl: '/app/communityFrame/communityTopSidebar/communityTopSidebar.html' },
      'dashboard@community': { templateUrl: '/app/communityFrame/dashboard/dashboard.html' },
      'userBottomSidebar@community': { templateUrl: '/app/communityFrame/userBottomSidebar/userBottomSidebar.html' },
      'chat@community': { templateUrl: '/app/communityFrame/chat/chat.html' }
    }
  })
  .state('exampleChat', {
    url: '/exampleChat',
    templateUrl: '/firechat/examples/anonymous/index.html'
  })
  .state('community-profile', {
    url: '/community-profile',
    templateUrl: '/app/communityProfile/communityProfile.html'
  })
}]);
