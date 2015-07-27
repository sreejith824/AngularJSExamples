(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name maintainClient.controller:ClientsearchCtrl
   * @description
   * # ClientsearchCtrl
   * Controller of the maintainClient
   */
  angular.module('security.app')
    .controller('SecurityController', SecurityController);

  SecurityController.$inject = ['SecurityService', '$state'];
  function SecurityController(SecurityService, $state) {
    var vm = this;
    vm.username = null;
    vm.password = null;
    vm.login = login;
    vm.getInfo = getInfo;
    vm.addStudent = addStudent;
    vm.addStudentMessage = null;
    vm.getStudentMessage = null;
    vm.loginMessage = null;
    vm.idnumber = null;
    vm.student = {};
    vm.getResult = {};

    function login() {
      SecurityService.login(vm.username, vm.password).then(function (response) {
        if (response == 200) {
          vm.loginMessage  = "Welcome " + response +  "!!!!";
          $state.go('security.studentinfo');
        }
      }).catch(function(error) {
          vm.loginMessage = error;
        });
    }

    function getInfo() {
      SecurityService.getInfo(vm.idnumber).then(function (response) {
        if (response) {
          vm.getStudentMessage = response;
          console.log(response);
        }
      }).catch(function(error) {
        vm.getStudentMessage = error;
      });
    }

    function addStudent() {
      SecurityService.addStudentInfo(vm.student).then(function (response) {
        if (response) {
          console.log(response);
          vm.addStudentMessage = response;
        }
      }).catch(function(error) {
        vm.addStudentMessage = error;
      });
    }
  }
})();
