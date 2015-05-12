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
      getPersonFromServer: getClient
    };



    function getClient(param) {
      var endpointURL = "http://localhost:9080/StudentWeb/MyRest-rest/services/students/" + param;
      //var endpointURL = "https://localhost:9443/StudentWeb/khula-rest/services/students/" + param;
      addWASHeaders();
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

    function addWASHeaders() {
      //to remove once testing and proper logins are done. Should use _generateBasicToken method below
      var authdata = Base64Provider().encode('ahofstee' + ':' + 'password');
      var securityToken = 'Basic ' + authdata;

      $http.defaults.headers.common['Authorization'] = securityToken;
      $http.defaults.headers.common['business-process-id'] = '1200';
      $http.defaults.headers.common['Content-Type'] = 'application/json';
      //$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      //$http.defaults.headers.common['Access-Control-Request-Headers'] = 'GET, POST';
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

