(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name maintainClient.maintainClientService
   * @description
   * # maintainClientService
   * Factory in the maintainClient.
   */
  angular.module('maintainClient.app').factory('maintainClientService', maintainClientService);

  maintainClientService.$inject = ['localStorageService'];

  function maintainClientService($localStorageService) {
    return {
      addPersonToLocalStorage : addPersonToLocalStorage
    };

    function addPersonToLocalStorage(clientInfo) {
      clientInfo.status = "Added";
      $localStorageService.set(clientInfo.IDNumber,clientInfo);
      return clientInfo;
    }

  }

})();
