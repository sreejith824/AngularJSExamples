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
    'ui.router',
    'maintainClient.app'
  ])
    .config(routeProviderConfig);

  function routeProviderConfig($stateProvider, $httpProvider) {
    $stateProvider
      .state('maintainClient', {
        url: "/clientManagement",
        templateUrl: "features/maintainClient/clientManagement.html"
      })
      .state('vehicle', {
        url: "/vehicle",
        templateUrl: "features/maintainVehicle/vehicle.html",
        resolve: {
          vehicle: function () {
            return {value: 'my vehicle'};
          }
        }

      })
      .state('vehicle.car', {
        url: "/car",
        templateUrl: "features/maintainVehicle/car.html"
      })
      .state('vehicle.car.hyundai', {
        url: "/hyundai",
        templateUrl: "features/maintainVehicle/hyundai.html",
        controller: "hyundaiController as ctrl",
        resolve: {
          hyundaiName: function () {
            return {value: 'my hyundai'};
          }
        }
      });
    $httpProvider.interceptors.push('RESTInterceptor');
  }


})();
