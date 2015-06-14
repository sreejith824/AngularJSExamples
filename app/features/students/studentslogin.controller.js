(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name maintainClient.controller:ClientsearchCtrl
   * @description
   * # ClientsearchCtrl
   * Controller of the maintainClient
   */
  angular.module('students.app')
    .controller('StudentLoginController', StudentLoginController);

  StudentLoginController.$inject = ['StudentsService', '$cookieStore'];
  function StudentLoginController(StudentsService, $cookieStore) {
    var vm = this;
    vm.username = null;
    vm.password = null;
    vm.login = login;
    vm.getInfo = getInfo;
    vm.message = null;
    vm.idnumber = null;
    vm.getResult = {};

    function login() {
      StudentsService.login(vm.username, vm.password).then(function (response) {
        if (response.status === "success") {
          vm.message = "Welcome " + vm.username+ "!!!!";
        }
      }).catch(function(error) {
          vm.message = error;
        });
    }

    function getInfo() {
      StudentsService.getInfo(vm.idnumber).then(function (response) {
        if (response) {
          vm.getResult = response;
          console.log('LtpaToken2 : ' + $cookieStore.get('LtpaToken2'));
        }
      }).catch(function(error) {
        vm.message = error;
      });
    }
  }
})();
