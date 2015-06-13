(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name maintainClient.controller:ClientsearchCtrl
   * @description
   * # ClientsearchCtrl
   * Controller of the maintainClient
   */
  angular.module('login.app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginService'];
  function LoginController(LoginService) {
    var vm = this;
    vm.createData = createData;
    vm.getData = getData;
    vm.name = null;
    vm.surname = null;
    vm.message = null;
    vm.allData = null;

    function createData() {
      LoginService.createDoc(vm.name, vm.surname).then(function (response) {
        if (response === true) {
          vm.message = "Welcome " + vm.name + "!!!!";

        }
      }).catch(function(error) {
          vm.message = error;
        });
    }

    function getData() {
      LoginService.getAllDocs(vm.name, vm.surname).then(function (response) {
          vm.allData = response;
      }).catch(function(error) {
        vm.message = error;
      });
    }


  }
})();
