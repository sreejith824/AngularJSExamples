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
    vm.loginUser = loginUser;
    vm.getData = getData;
    vm.username = null;
    vm.password = null;
    vm.message = null;
    vm.allData = null;

    function loginUser() {
      LoginService.loginUser(vm.username, vm.password).then(function (response) {
        if (response === true) {
          vm.message = "Welcome " + vm.username + "!!!!";

        }
      }).catch(function(error) {
          vm.message = error;
        });
    }

    function getData() {
      LoginService.getAllDocs(vm.username, vm.password).then(function (response) {
          vm.allData = response;
      }).catch(function(error) {
        vm.message = error;
      });
    }


  }
})();
