var q = require("q");
var MediaWikiAPI = require('./APIs/MediaWikiAPI');
var controller = require('./processors/Wiki');

/**
 * @todo: sourceMediator võiks järgida mõnda mustrit ja seega olla mõne mustri
 * alamklass?
 * 
 * @class sourceMediator
 * @constructor
 * @return {sourceMediator} sourceMediator for the Estonian Wikipedia
 */
function sourceMediator() {
  /* vanas koodis registreeriti järgmiste andmetega:
   * WikiEst: {id: 'WikiEst', cls: SourceWikiEstAPI, abbr: 'Vikipeedia', name: 'Eesti Vikipeedia'}
   * @todo: kustutada see märge!
   */
  
  var api = new MediaWikiAPI();
  
  /**
   * SourceMediator's query function returns a promise!
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
module.exports = sourceMediator();
