/**
 * Lihtne AJAX moodul mis oskab teha XHR päringuid ja tagastab lubadusi nende
 * täitumisest.
 * 
 * a mix of codes heavily simplified and extended to work on node.js
 * ajax code originally from: https://www.npmjs.org/package/ajax
 * promise code from Q: https://gist.github.com/kriskowal/593076
 * 
 * @module qxhr
 * @class qxhr
 * @static
 */

var Q = require("q");
// node.js-il puudub XMLHttpRequest
if (!XMLHttpRequest) {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}

/**
 * Reads an URL using GET method
 * 
 * @method get
 * @param {String} url
 * @param {Object} [params]
 * @param {Function} [cb] callback
 * @return {promise}
 */
function get(url, params, cb) {
    return send(url, 'GET', params, cb);
}

/**
 * Reads an URL using POST method
 * 
 * @method post
 * @param {String} url
 * @param {Object} [params]
 * @param {Function} [cb] callback
 * @return {promise}
 */
function post(url, params, cb) {
    return send(url, 'POST', params, cb);
}

/**
 * Reads an URL using the specified method
 * 
 * @method send
 * @param {String} url
 * @param {String} method
 * @param {Object} [params]
 * @param {Function} [cb] callback
 * @return {promise}
 */
function send(url, method, params, cb) {
    var response = Q.defer();
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = xhr.responseText;
                try {
                    data = JSON.parse(data);
                } catch (exc) {
                }
                if (cb) {
                    cb(data);
                }
                response.resolve(data);
            } else {
                response.reject("HTTP " + xhr.status + " for " + url);
            }
        }
    };

    var body;
    if (params) {
        var bodies = [];
        for (var name in params) {
            bodies.push(name + '=' + encodeURIComponent(params[name]));
        }

        body = bodies.join('&');
        if (body.length) {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
        }        
    }
    xhr.send(body);
    return response.promise;
}

/**
 * Reads JSONP from an URL
 * 
 * @method getJSON
 * @param {String} url
 * @param {Object} [params]
 * @param {Function} [cb] callback
 * @return {promise}
 */
function getJSON(url, params, cb) {
    var bodies = [];
    if (params) {
        for (var name in params) {
            bodies.push(name + '=' + encodeURIComponent(params[name]));
        }
        if (!params.hasOwnProperty('callback')) {
            // default callback
            bodies.push('callback=jsonp');
        }
    }
    if (bodies.length) {
        url = url + (url.indexOf('?') == -1 ? '?' : '&') + bodies.join('&');
    }
    
    function jsonpReturn(data) {
        console.log('in jsonpReturn()');
        if (!data || data.error) {
            if (cb) {
                cb(data);
            }
        } else {
            if (cb) {
                cb(0, data);
            }
        }
        return data;
    }
    
    var jsonp = jsonpReturn; // eval vajab jsonp funktsiooni

    var response = Q.defer();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var evaled = eval(xhr.responseText);
                response.resolve(evaled);
            } else {
                response.reject("HTTP " + xhr.status + " for " + url);
            }
        }
    };
    xhr.send("");
    return response.promise;
}

/**
 * jQuery ajax meetodiga sarnane liides
 * 
 * @method ajax
 * @param {String} url
 * @param {Object} [settings]
 * @return {promise}
 */
function ajax(url, settings) {
    // settings.data on sama mis params mujal
    // dataType 'json', 'jsonp'
    // cache true v false
    // xhrFields
}

exports.get = get;
exports.post = post;
exports.send = send;
exports.getJSON = getJSON;