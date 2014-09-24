var Q = require("q");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.read = function (path, timeout) {
  var response = Q.defer();
  var request = new XMLHttpRequest(); // ActiveX blah blah
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