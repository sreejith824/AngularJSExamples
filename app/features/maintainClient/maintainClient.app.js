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
    ['LocalStorageModule', 'xc.indexedDB', 'ngResource','ui.grid']);
})();
