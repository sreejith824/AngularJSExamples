(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name maintainClient.maintainClientService
   * @description
   * # maintainClientService
   * Factory in the maintainClient.
   */
  angular.module('maintainClient.app')
    .factory('ClientManagementService', ClientManagementService);

  ClientManagementService.$inject = ['$http'];

  function ClientManagementService($http) {
    var self = this;
    return {
      getPersonFromServer: getClient,
      helloClient : helloClient
    };
    function getClient(param) {
      var endpointURL = "http://localhost:9080/StudentWeb/MyRest-rest/services/students/" + param;
      //var endpointURL = "https://localhost:9443/StudentWeb/khula-rest/services/students/" + param;
      var req = {
        method: 'GET',
        url: endpointURL
      };
      return $http(req)
        .success(function (response, status) {
          console.log("returned from get client");
          console.log(response);
          return response;
        })
        .error(function (error) {
          return error;
        });
    }

    function helloClient(param) {
      var postData  = {'name' : param};
      var endpointURL = "http://localhost:9083/HelloWorldMessageListeningMediationWeb/HelloWorldMessageListeningHttpExport/readMesasge";
      var req = {
        method: 'POST',
        url: endpointURL,
        data : postData

      };
      return $http(req)
        .success(function (response, status) {
          console.log("returned from get client");
          console.log(response);
          return response;
        })
        .error(function (error) {
          return error;
        });
    }
  }
}) ();

