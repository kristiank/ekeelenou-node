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
    return api.query(queryString, queryParams);
    
    /* When the API is resolved, send it to the controller */
    // deferred.then( ... );
    
    /* When the controller is resolved, return the data */
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
