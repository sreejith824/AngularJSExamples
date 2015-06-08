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
    .controller('ClientManagementController', ClientManagementController);

  ClientManagementController.$inject = ['ClientManagementService', 'PouchDBService'];
  function ClientManagementController(ClientManagementService, PouchDBService) {
    var vm = this;
    vm.getPerson = getPerson;
    vm.helloPerson = helloPerson;
    vm.clientInfo = {};
    vm.clientDetails = {};

    function getPerson() {
      console.log("inside getPerson");
      ClientManagementService.getPersonFromServer(vm.clientInfo.resourceId).then(function (data) {
        console.log("inside ClientManagementController Callback");
        vm.clientDetails = data.data;
      })
    }

    function helloPerson() {
      console.log("inside getPerson");

      PouchDBService.initializePouchDBAuthentication();
      //PouchDBService.createClient();

      /*ClientManagementService.helloClient(vm.clientInfo.resourceId).then(function (data) {
       console.log("inside ClientManagementController Callback");
       vm.clientDetails = data.data;
       })*/
    }


  }
})();
