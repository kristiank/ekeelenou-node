/**
 * Lihtne moodul mis võimaldab teha lubadustega XMLHttpRequest'e lugemiseks.
 * Kood pärineb: https://gist.github.com/kriskowal/593076
 * @module promiseXHR
 * @main ekeelenou-server
 */

var Q = require("q");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * Võimaldab lugeda aadressilt asünkroonselt XMLHttpRequest'i abil
 * 
 * @method read
 * @param {String} path the path to read
 * @param {Number} [timeout] an optional timeout
 * @return {promise} response
 */
exports.read = function (path, timeout) {
  var response = Q.defer();
  var request = new XMLHttpRequest();
  request.open("GET", path, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        response.resolve(request.responseText);
      } else {
        response.reject("HTTP " + request.status + " for " + path);
      }
    }
  };
  timeout && setTimeout(response.reject, timeout);
  request.send('');
  return response.promise;
};