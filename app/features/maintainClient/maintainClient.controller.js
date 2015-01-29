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

  maintainClientController.$inject = ['MaintainClientService'];
  function maintainClientController(maintainClientService) {
    this.search = searchPerson;
    this.addPerson = addPerson;
    var vm = this;
    this.gridData = [];
    this.gridOptions = {
      //selection
      enableRowSelection: true,
      enableSelectAll: false,
      selectionRowHeaderWidth: 35,
      multiSelect: false,
      modifierKeysToMultiSelect: false,
      enableRowHeaderSelection: false,
      noUnselect: false,
      //sorting
      enableSorting: true,
      //column sizing
      showColumnMenu: true,
      enableColumnResizing: true,
      columnDefs: [
        {field: 'firstName', displayName: 'Name', minWidth: 100, width: '20%'},
        {field: 'IDNumber', displayName: 'ID Number', minWidth: 400, width: '65%'}
      ]
    };
    //refeshPersonGrid();
    getPersonListFromIndexedDB();

    function searchPerson() {
      this.clientInfo.firstName = "TEST";
      return clientInfo;
    }

    function addPerson(clientInfo) {
      //maintainClientService.addPersonToLocalStorage(clientInfo);
      maintainClientService.addPersonToIndexedDB(clientInfo).then(function() {
        console.log("inside callback. About to call getPersonListFromIndexedDB");
      });
      getPersonListFromIndexedDB();
      //refeshPersonGrid();
    }

    function refeshPersonGrid() {
      vm.gridData = maintainClientService.getPersonFromLocalStorage();
      vm.gridOptions = {data: vm.gridData};
    }

    function getPersonListFromIndexedDB() {
      maintainClientService.getPersonFromIndexedDB().then(function (data) {
        vm.gridData = data;
        console.log(vm.gridData.length);
        vm.gridOptions = {data: vm.gridData};
        console.log("inside getPersonListFromIndexedDB");
      })
    }

  }
})();
