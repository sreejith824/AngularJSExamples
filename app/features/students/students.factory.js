(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name maintainClient.maintainClientService
   * @description
   * # maintainClientService
   * Factory in the maintainClient.
   */
  angular.module('students.app')
    .factory('StudentsService', StudentsService);

  StudentsService.$inject = ['$q', '$http', '$cookies'];

  function StudentsService($q, $http, $cookies) {
    var self = this;

    return {
      login: login,
      getInfo : getInfo
    };


    function login(username, password) {

      var defer = $q.defer();
      var data = {username : username, password : password};
      var loginCredential = Base64Provider().encode(username + ':' + password);
      var url = "http://localhost:9080/LoginManagerWeb/MyRest-rest/login";
      var headers = {'Authorization' : 'Basic ' + loginCredential,
      'Content-Type' : 'application/json'};
      $http.post(url, data,{withCredentials : true, headers: headers}).success(function (response, status,headers, config) {
        console.log($cookies['LtpaToken2']);
        defer.resolve(response);
      }).error(function (data, status, headers, config) {
        defer.resolve(result);
      });

      return defer.promise;
    }

    function getInfo(idnumber) {

      var defer = $q.defer();
      var url = "http://dev.local.net/StudentWeb/MyRest-rest/services/students/" + idnumber;

      $http.get(url,{withCredentials : true, headers: headers}).success(function (response, status,headers, config) {
        defer.resolve(response);
      }).error(function (error, status, headers, config) {
        defer.resolve(error);
      });

      return defer.promise;
    }
    function Base64Provider() {
      /* jshint ignore:start */

      var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

      return {
        encode: function (input) {
          var output = "";
          var chr1, chr2, chr3 = "";
          var enc1, enc2, enc3, enc4 = "";
          var i = 0;

          do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }

            output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
          } while (i < input.length);

          return output;
        },

        decode: function (input) {
          var output = "";
          var chr1, chr2, chr3 = "";
          var enc1, enc2, enc3, enc4 = "";
          var i = 0;

          // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
          var base64test = /[^A-Za-z0-9\+\/\=]/g;
          if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
          }
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

          do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

          } while (i < input.length);

          return output;
        }
      }

    }
  }
}) ();

