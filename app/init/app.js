(function () {

  'use strict';

  /**
   * @ngdoc overview
   * @name angularjsTrainingApp
   * @description # angularjsTrainingApp
   *
   * Main module of the application.
   */
  angular.module('angularjsExamplesApp', [
    'ui.router'
    //'maintainClient.app'
  ])
  .config(routeProviderConfig) ;

  function routeProviderConfig($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise("/maintainClient");

    $stateProvider
      .state('maintainClient', {
        url: "/maintainClient",
        //template : '<div><h> eee</h></div>'
        templateUrl: "features/maintainClient/maintainClient.html"
      })
      .state('vehicle', {
        url: "/vehicle",
        templateUrl: "features/maintainVehicle/vehicle.html"
      })
      .state('vehicle.car', {
        url: "/car",
        templateUrl: "features/maintainVehicle/car.html"
      })
  }
})();
