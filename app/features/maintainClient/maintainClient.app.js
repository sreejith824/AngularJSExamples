(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name maintainClient
   * @description
   * # maintainClient
   *
   * Main module of the application.
   */
  angular.module('maintainClient.app',
    ['maintainClient.controller'])
    .config(routeProviderConfig) ;

  function routeProviderConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'features/maintainClient/maintainClient.html',
        controller: 'MaintainClientController'
      })
  }
})();
