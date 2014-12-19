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
    ['LocalStorageModule', 'ngResource', 'xc.indexedDB'])
    .config(localStorageConfig)
    .config(indexedDBProviderConfig)
    .factory('maintainClientService', maintainClientService);

  maintainClientService.$inject = ['localStorageService', '$indexedDB'];

  function maintainClientService($localStorageService, $indexedDB) {

    this.OBJECT_STORE_NAME = "Client";
    this.CLIENT_OBJECT_STORE = $indexedDB.objectStore(this.OBJECT_STORE_NAME);
    this.PERSON_LIST = [];

    var vm = this;
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
      clientInfo.status = "Added";
      vm.CLIENT_OBJECT_STORE.insert(clientInfo).then(function () {
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

      vm.CLIENT_OBJECT_STORE.getAll().$promise.then(function (results) {
        console.log(results);
        return results;
      });
    }
  }

  localStorageConfig.$inject = ['localStorageServiceProvider'];

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
