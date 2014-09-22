var api = require('./APIs/WikiAPI');
var controller = require('./processors/Wiki');

function sourceMediator() {
  /* vanas koodis registreeriti järgmiste andmetega:
   * WikiEst: {id: 'WikiEst', cls: SourceWikiEstAPI, abbr: 'Vikipeedia', name: 'Eesti Vikipeedia'}
   */
   
   function query(queryString, queryParams) {
     //api.query(queryString, queryParams);
     console.log('WikiEst.query() ' + queryString);
     //~ socket.emit('queryData', JSON.stringify('ei leitud!'));
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

// NB! must execute function before exporting
module.exports = sourceMediator();
