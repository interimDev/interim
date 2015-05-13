// Declare app level module which depends on views, and components
angular.module('interim', [
  'firebase',
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
  'interim.userProfile',
  'interim.communityProfile',
  'interim.superAdmin',
  'interim.communityTopSidebar'
])

.run(function($rootScope){

  // handles routing permission authorization by checking the privelege of the user
  // ~check ur privelege~ https://alizetigirl.files.wordpress.com/2014/10/check-your-privilege.jpg
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, $state) {
    //checks the state's data (held in the router config) to see
    //if the route requires permission
    if(toState.data && toState.data.requirePermission){
      if(!$rootScope.superAdmin){
        alert("you are not an admin!");
        event.preventDefault();
      }
    }
  });

  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
      console.log(rejection);
  });
})


.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $firebaseObject, Auth) {
  $urlRouterProvider.otherwise('/signin');
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
  .state('community-profile', {
    url: '/community-profile/:communityName',
    templateUrl: '/app/communityProfile/communityProfile.html',
    resolve:{
      community: function($stateParams, Auth) { 
        return Auth.queryCommunityDB($stateParams.communityName)
        .then(function (data) {
          return data;
        })
      }
    },
    controller: 'CommunityProfileController'
  })
  .state('profileEditor', {
    url: '/profileEditor',
    controller: 'profileEditorController',
    templateUrl: '/app/communityFrame/userBottomSidebar/profileEditor.html'
  })
  .state('superadmin', {
    url:'/superadmin',
    templateUrl: '/app/superadmin/superadmin.html',
    data: {
      requirePermission: true
    }
  });
}]);

