(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name maintainClient.maintainClientService
   * @description
   * # maintainClientService
   * Factory in the maintainClient.
   */
  angular.module('maintainClient.service',
    ['LocalStorageModule', 'xc.indexedDB', 'ngResource'])
    .config(localStorageConfig)
    .config(indexedDBProviderConfig)
    .factory('maintainClientService', maintainClientService);

  maintainClientService.$inject = ['localStorageService', '$indexedDB', '$q', '$resource'];

  function maintainClientService($localStorageService, $indexedDB, $q, $resource) {
    this.indexedPersonData = [];
    var self = this;
    return {
      addPersonToLocalStorage: addPersonToLocalStorage,
      addPersonToIndexedDB: addPersonToIndexedDB,
      getPersonFromLocalStorage: getPersonFromLocalStorage,
      getPersonFromIndexedDB: getPersonFromIndexedDB
    };

    function addPersonToLocalStorage(clientInfo) {
      clientInfo.status = "Added";
      $localStorageService.set(clientInfo.IDNumber, clientInfo);
      return clientInfo;
    }

    function addPersonToIndexedDB(clientInfo) {
      var deferred = $q.defer();
      var clientObjectStore = $indexedDB.objectStore("Client");
      clientInfo.status = "Added";
      return clientObjectStore.insert(clientInfo).then(function () {
          console.log("Saved To IndexedDB");
      });
    }

    function getPersonFromLocalStorage() {
      var storageKeys = $localStorageService.keys();
      var personList = [];
      storageKeys.forEach(function (storageKey) {
          personList.push($localStorageService.get(storageKey));
        }
      );
      return personList;
    }

    function getPersonFromIndexedDB() {
      var clientObjectStore = $indexedDB.objectStore("Client");
      return clientObjectStore.getAll().then(function (results) {
        return results;
      });
    };
  }

  function localStorageConfig(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix("maintainClient.app")
      .setStorageType("localStorage")
      .setNotify("true", "true");
  }

  function indexedDBProviderConfig($indexedDBProvider) {
    $indexedDBProvider.connection("ExampleDB")
      .upgradeDatabase(1, function (event, db, tx) {
        var objeStore = db.createObjectStore("Client", {keyPath: "IDNumber"});
        objeStore.createIndex("name_idx", "firstName");
      });
  }
})();
