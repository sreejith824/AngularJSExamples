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
  angular.module('maintainClient.app', ['LocalStorageModule','ui.grid'])
    .config(localStorageConfig)
    .config(routeProvider);

  function routeProvider($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'features/maintainClient/maintainClient.html',
        controller: 'MaintainClientController'
      })
  }
  localStorageConfig.$inject = ['localStorageServiceProvider'];

   function localStorageConfig(localStorageServiceProvider) {
     localStorageServiceProvider
       .setPrefix("maintainClient.app")
       .setStorageType("localStorage")
       .setNotify("true","true");
  }
})();
