var q = require("q");
var MediaWikiAPI = require('./APIs/MediaWikiAPI');
var controller = require('./processors/Wiki');

/**
 * E-keelenõu ressursi mediaator, mis võimaldab QueryManager'il teha 
 * päringuid Eesti Vikipeedias.
 * 
 * @class estWikiMediator
 * @constructor
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator for the Estonian Wikipedia
 */

var id   = 'WikiEst';
var abbr = 'Vikipeedia';
var name = 'Eesti Vikipeedia';

function estWikiMediator() {
  var api = new MediaWikiAPI('https://et.wikipedia.org/w/api.php');
  
  /**
   * Sooritab päringu Eesti Vikipeedia APIs
   * 
   * @method query
   * @param {string} queryString
   * @param [queryParams] optional parameters
   * @return {promise}
   */
  function query(queryString, queryParams) {
    var answerPromise = api.query(queryString, queryParams);
    // kui päringu lubadus täitub, lisame sellele oma päritolu informatsiooni
    // teisisõnu, vormistame sellest kliendile õige "QueryMessage" sõnumi
    var clientMsgPromise = answerPromise.then(function(data) {
      var message = {};
      message['id']   = id;
      message['name'] = name;
      message['abbr'] = abbr;
      message['data'] = data;
      return message;
    });
    
    /* siin võiksime lisada päritud andmete töötlejaid lubaduse ahelasse */
    
    return clientMsgPromise;
  }
   
  /*
   * Public interface to EstWikiMediator
   */
  return {
    'id':   'WikiEst',
    'abbr': 'Vikipeedia',
    'name': 'Eesti Vikipeedia',
    'query': query
  };
}

// NB! export the module, not the class
module.exports = estWikiMediator();
