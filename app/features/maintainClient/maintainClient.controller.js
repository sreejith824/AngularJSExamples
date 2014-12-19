(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name maintainClient.controller:ClientsearchCtrl
   * @description
   * # ClientsearchCtrl
   * Controller of the maintainClient
   */
  angular.module('maintainClient.app')
    .controller('MaintainClientController', maintainClientController);

  maintainClientController.$inject = ['maintainClientService'];

  function maintainClientController(maintainClientService) {
    this.search = searchPerson;
    this.addPerson = addPerson;

    this.gridData = [{name:"test",age:"30"}];
    this.gridOptions = {data:this.gridData};

    function searchPerson() {
      this.clientInfo.firstName = "TEST";
      return clientInfo;
    }

    function addPerson(clientInfo) {
      maintainClientService.addPersonToLocalStorage(clientInfo);
    }


  }

})();
