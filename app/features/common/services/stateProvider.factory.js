(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name maintainClient.maintainClientService
   * @description
   * # maintainClientService
   * Factory in the maintainClient.
   */
  angular.module('angularjsExamplesApp')
    .factory('StateProviderService', StateProviderService);

  //StateProviderService.$inject = ['$state'];

  function StateProviderService() {
    return {
      state : getState()
    }
    function getState(){
      return "Hello";
    }

  }
}) ();

