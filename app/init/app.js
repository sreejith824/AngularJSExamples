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
    'maintainClient.app',
    'pouchdb.service',
    'login.app',
    'students.app',
    'security.app'
  ])
    .config(routeProviderConfig)
    .run(['$rootScope', '$state', function ($rootScope, $state) {

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name === 'security') {
          event.preventDefault();
          $state.go('security.login');

        }
      });

    }]);

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
      })
      .state('login', {
        url: "/login",
        templateUrl: "features/login/login.html",
        controller: "LoginController as controller"
      })
      .state('students', {
        url: "/students",
        templateUrl: "features/students/students.html"
      })
      .state('students.login', {
        url: "/studentslogin",
        templateUrl: "features/students/studentslogin.html",
        controller: "StudentLoginController as controller"
      })
      .state('students.connect', {
        url: "/studentsconnect",
        templateUrl: "features/students/studentsconnect.html",
        controller: "StudentLoginController as controller"
      })
      .state('security', {
        url: "/security",
        templateUrl: "features/security/security.html"
      })
      .state('security.login', {
        url: "/securitylogin",
        templateUrl: "features/security/securitylogin.html",
        controller: "SecurityController as controller"
      })
      .state('security.studentinfo', {
        url: "/securitystudentinfo",
        templateUrl: "features/security/securitystudentinfo.html",
        controller: "SecurityController as controller"
      })
    ;
    $httpProvider.interceptors.push('RESTInterceptor');
  }


})();
