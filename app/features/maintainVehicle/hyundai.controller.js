(function () {
  'use strict';
  /**
   *
   */
  angular.module('angularjsExamplesApp')
    .controller('hyundaiController', hyundaiController);
  hyundaiController.$inject = ['vehicle','hyundaiName'];
  function hyundaiController(vehicle,hyundaiName) {
    console.log("Inside hyundaiController");
    this.vehicleName = vehicle;
    this.hyundaiName = hyundaiName;
  }
})();
