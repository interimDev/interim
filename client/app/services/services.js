angular.module('interim.services', [])

.factory('SomeName', function ($http) {
  // Your code here
  
  //example function
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getAll: getAll
  }
});