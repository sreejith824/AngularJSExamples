(function () {

  'use strict';

  angular.module('pouchdb.service', [])

    .factory('PouchDBService', PouchDBService);

  PouchDBService.$inject = ['$q', '$rootScope'];

  function PouchDBService($q, $rootScope) {

    var self = this;
    self.docId = "123456";
    self.localPouchDB = null;

    self.pouchOpts = {
      skipSetup: true
    };

    self.remoteCouchDBURL = "http://admin:admin@localhost:5984";

    self.credentials = {username : '' ,password :''};

    return {
      //syncUserInformation: syncUserInformation,
      getAllDocs: getAllDocs,
      createUserDoc: createUserDoc,
      setCredentials : setCredentials
    };

    function createUserDoc(username) {
      console.log("Inside syncUserInformation");

      self.localPouchDB = _initializePouchDB();

      var defer = $q.defer();
      _initializeDoc(username).then(function (response) {
        //defer.resolve(_sync());
        defer.resolve();
      })
        .catch(function (error) {
          defer.resolve(error);
        });
      return defer.promise;
    }

    function _initializeDoc(username) {

      console.log("Inside  _initializeDoc");

      var defer = $q.defer();

      var doc =
      {
        _id : self.docId,
        content : "Hello World !!!",
        name : username
      };

      self.localPouchDB.put(doc).then(function (response) {
        console.log("Inside  localPouchDB.put callback");
        console.log(response);
        defer.resolve(response);
      }).catch(function (error) {
        console.log("Inside  localPouchDB.put error callback");
        console.log(error);
        defer.reject(error);
      });

      return defer.promise;
    }

    function _decryptDoc(doc) {
      console.log("Before decryption !!!");
      console.log(doc);

      Object.keys(doc).forEach(function (field) {
        if (field !== '_id' && field !== '_rev') {
          doc[field] = _decrypt(doc[field]);
        }
      });
      console.log(doc);
      return doc;
    }

    function _encryptDoc(doc) {
      Object.keys(doc).forEach(function (field) {
        if (field !== '_id' && field !== '_rev') {
          doc[field] = _encrypt(doc[field]);
        }
      });
      console.log(doc);
      return doc;
    }

    function _encrypt(text) {
      var key = self.credentials.password +  self.credentials.username;
      console.log("Encryption key" , key);
      return sjcl.encrypt(key, text);
    }

    function _decrypt(text) {
      var key = self.credentials.password +  self.credentials.username;
      console.log("Encryption key" , key);
      return sjcl.decrypt(key, text);
    }

    function getAllDocs() {

      console.log("Inside  getAllDocs");

      var defer = $q.defer();

      self.localPouchDB.allDocs({include_docs: true}).then(function (response) {
        console.log("Inside  localPouchDB.get callback");
        console.log(response);
        defer.resolve(response);
      }).catch(function (error) {
        console.log("Inside  localPouchDB.get error callback");
        console.log(error);
        defer.reject(error);

      });

      return defer.promise;
    }

    function _initializePouchDB() {
      var pouchDBName = "local_test";
      var localPouchDB = new PouchDB(pouchDBName);
      localPouchDB.transform({
        incoming: function (doc) {
          console.log("Inside incoming", doc);
          return _encryptDoc(doc);
        },
        outgoing: function (doc) {
          console.log("Inside outgoing");
          return _decryptDoc(doc);
        }
      });

      return localPouchDB;
    }

    function setCredentials(username, password) {
      self.credentials = {username : username ,password :password};
      console.log("Credential", self.credentials);
    }

    function _sync() {

      console.log("Inside _sync");

      var defer = $q.defer();
      PouchDB.sync(self.localPouchDB,  self.remoteCouchDBURL + '/remote_test').on('complete', function (info) {

        console.log("Inside PouchDB.sync callback");
        console.log(info);
        defer.resolve(info);

      }).catch(function (error) {

        console.log("Inside PouchDB.sync error callback");
        console.log(error);
        defer.reject(error);

      });

      return defer.promise;
    }

  }

  /*    function syncUserInformation(username, password) {

   console.log("Inside syncUserInformation");

   var defer = $q.defer();

   self.ajaxOpts = {
   ajax: {
   headers: {
   Authorization: 'Basic ' + window.btoa(username + ':' + password)
   }
   }
   };

   var remoteDB = new PouchDB(self.remoteCouchDBURL + username, self.pouchOpts);
   defer.resolve(_login(remoteDB, username, password));
   //Build remote DB name URL
   //Check username exists in remote DB
   //If not exists , signUp
   //if exists sign in
   //if sign in success : sync from remote to local

   return defer.promise;
   }*/

  /*    function _login(remoteDB, username, password) {

   var defer = $q.defer();

   remoteDB.login(username, password).then(function (response) {

   console.log("Inside remoteDB.login callback");
   console.log("remoteDB : " + JSON.stringify(remoteDB._db_name));
   console.log(response);
   defer.resolve(_initializeDoc(remoteDB, username));

   }).catch(function (error) {

   console.log("Inside remoteDB.login error callback");
   console.log(error);

   if (error.name === 'unauthorized') {

   console.log("Inside remoteDB.login  callback error unauthorized");
   console.log(error);
   defer.resolve(_signUp(remoteDB, username, password));

   } else {

   console.log("Inside remoteDB.login  callback error");
   console.log(error);
   defer.reject(error);

   }
   });

   return defer.promise;
   }*/




  /*    function _signUp(remoteDB, username, password) {

   console.log("Inside _signUp");
   var defer = $q.defer();

   remoteDB.signup(username, password).then(function (response) {

   console.log("Inside remoteDB.signup callback");
   console.log(response);

   if (response.ok === 'true') {
   defer.resolve(_login(remoteDB, username, password));
   }

   }).catch(function (error) {

   console.log("Inside remoteDB.signup error callback");
   console.log(error);
   defer.reject(error);

   });

   return defer.promise;
   }*/

})();
