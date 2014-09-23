var q = require("q");
var api = require('./APIs/WikiAPI');
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
  
  /**
   * SourceMediator's query function returns a promise!
   * 
   * @method query
   * @param {string} queryString
   * @param [queryParams]
   * @return {promise}
   */
  function query(queryString, queryParams) {
    //api.query(queryString, queryParams);
    console.log('WikiEst.query() ' + queryString);
    
    var deferred = q.defer();
    
    /* Query the API */  
    q.delay(5100)
    .done(function() {
      console.log("(resolving the promise)");
      deferred.resolve("Eesti Vikipeedia vastus saabus");
    });
    
    /* When the API is resolved, send it to the controller */
    // deferred.then( ... );
    
    /* When the controller is resolved, return the data */
    return deferred.promise;
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
