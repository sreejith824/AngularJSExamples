(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name maintainClient.maintainClientService
   * @description
   * # maintainClientService
   * Factory in the maintainClient.
   */
  angular.module('login.app')
    .factory('LoginService', LoginService);

  LoginService.$inject = ['$q', "PouchDBService"];

  function LoginService($q, PouchDBService) {
    var self = this;

    return {
      createDoc: createDoc,
      getAllDocs :  getAllDocs
    };

/*   function loginUser(username, password) {
     var defer = $q.defer();
    if (username == 'userone' && password === "user1") {
      PouchDBService.syncUserInformation(username, password).then(function (response) {
        var isValidUser = true;
        defer.resolve(isValidUser);
      });
    }
     return defer.promise;
   }*/
    function createDoc(username, password) {
      var defer = $q.defer();
        PouchDBService.createUserDoc(username).then(function (response) {
          var isValidUser = true;
          defer.resolve(isValidUser);
        });
      PouchDBService.setCredentials(username,password);
      return defer.promise;
    }

    function getAllDocs(username,password) {
      var defer = $q.defer();
      PouchDBService.setCredentials(username,password);
      PouchDBService.getAllDocs().then(function (response) {
        defer.resolve(response);
      }).catch(function(error){
        defer.resolve(error);
      });

      return defer.promise;
    }



  }
}) ();

