/**
 * E-keelenõu server koosneb kahest suuremast osast. Üks on 'globaalne' üle
 * serveri ja sisaldab kõike komponente, millest on vaja vaid üks instants.
 * Teine on kasutaja 'lokaalne' osa, mis sisaldab konkreetsele kasutajale
 * vajaminevaid komponente. Neid kasutajakomponente eksisteerib sama palju, kui
 * ühel ajal on serveriga ühendunud kasutajaid.
 * 
 * Globaalne komponent on nt Sources, mis sisaldab süsteemi kõiki
 * registreerituid allikaid.
 * Lokaalne komponent on nt QueryManager, mis käitab kasutaja päringuid tema
 * valitud allikatele. SourceViewWrapper ühitab süsteemi allikamediaatori kokku
 * kasutaja sokliga (kas WebSocket, JSON vms).
 * 
 * @module ekeelenou-server
 * @main ekeelenou
 */

/* Registreerime süsteemi globaalsed allikad, neile lisatakse hiljem
 * mingisugune viewDecorator */
var sources = require('./sources');
var q = require("q");
var estWikiMediator = require('./sources/estWikiMediator');
sources.register(estWikiMediator);
sources.register({id: 'test1', name: 'proov1', abbr: 't1', query: function(qstr){
  var deferred = q.defer();
    
  /* Query the API */  
  q.delay(3000)
  .done(function() {
    console.log("(resolving the promise)");
    deferred.resolve("proov1 vastus saabus");
  });
  
  return deferred.promise;
}});
sources.register({id: 'test2', name: 'proov2', abbr: 't2', query: function(qstr){
  var deferred = q.defer();
    
  /* Query the API */  
  q.delay(500)
  .done(function() {
    console.log("(resolving the promise)");
    deferred.resolve("proov2 vastus saabus");
  });
  
  return deferred.promise;
}});
sources.register({id: 'test3', name: 'proov3', abbr: 't3', query: function(qstr){
  var deferred = q.defer();
    
  /* Query the API */  
  q.delay(3500)
  .done(function() {
    console.log("(resolving the promise)");
    deferred.resolve("proov3 vastus saabus");
  });
  
  return deferred.promise;
}});

console.log('registered sources: ', sources.getAllSourcesList());

/**
 * Iga kord kui keegi loob ühenduse avatakse talle oma sokkel. Sokliga justkui
 * tekitatakse lihtne seanss, mille piires kasutajal on omad muutujad.
 * 
 * Iga sokli puhul on kasutajal isiklik
 * - queryManager -- hoiab mh valitud allikate nimekirja
 * - socket -- isiklikuks kahepoolseks kommunikatsiooniks serveriga
 * 
 * @method initUserSocket
 * @param {socket.io} io the global socket.io object
 * @param {socket} socket the user's personal socket
 */
exports.initUserSocket = function(io, socket) {
  console.log('user on socket with id: ', socket.id);
  
  // @todo: what should we do on disconnect?
  socket.on('disconnect', function(message) {
    console.log('disconnect on socket id: ', socket.id);
    // @todo: garbage collect?
  });
  
  // igal kasutajal on oma QueryManager
  var queryManager = require('./QueryManager')(undefined, socket);
  
  console.log('user init QM with sources: ', queryManager.getSelectedSourcesList());
  
  // on new connections, send a welcoming message
  // @todo: initialize a userSettings object or UID?
  socket.emit('queryData',
              JSON.stringify('sokkel avatud nimega: ' + socket.id));
  socket.emit('selectedSources',
              //JSON.stringify('valitud on valitud'));
              JSON.stringify(queryManager.getSelectedSourcesList()));
  socket.emit('availableSources',
              JSON.stringify(sources.getAllSourcesList()));
  
  // set up the events per individual socket
  /**
   * Queries the resources. This message is forwarded
   * to the QueryManager.
   * 
   * @method query
   * @param {Object} queryMessage
   */
  socket.on('query', function(JSONmessage) {
    var promises, promise, i;
    var message = JSON.parse(JSONmessage);
    
    console.log('socket query: ', message);
    console.log('with selected sources: ', 
      queryManager.getSelectedSourcesList());
    
    promises = queryManager.query(message.queryString);
    console.log('ekn typeof promise: ', typeof promises);
    
    console.log('final promise: ', promises);
    /* käivita lubadused nende täitumisel */
    for(i=0; i<promises.length; i+=1) {
      promise = promises[i];
      promise.then(function(promiseValue){ 
        console.log('then was ', promiseValue);
        socket.emit('queryData',
                    JSON.stringify('<div>Leitud leiud sellised: ' +
                    message.queryString + ' - ' + promiseValue +
                    '</div>'));
      }).done(); // we can close the promise!
    }
    //promise.then(console.log("queryManager fullfills the promise!"));
    /*
    promise.then( function(promise) {
      socket.emit('queryData',
                  JSON.stringify('<div>Leitud leiud sellised: ' +
                  message.queryString + ' - ' + promise +
                  '</div>'));
    }).done(); // close the promise!
    */
  });
  
  /**
   * Selects a source. This message is forwarded to the QueryManager.
   * 
   * @method addSource
   * @param {String} id the source's id
   * @return selectedSources
   */
  socket.on('addSource', function(message) {
    message = JSON.parse(message);
    console.log('socket addSource: ', message.id);
    queryManager.addSource(message.id);
    socket.emit('selectedSources',
                JSON.stringify(queryManager.getSelectedSourcesList()));
  });
  
  /**
   * Unselects a source. This message is forwarded to the QueryManager.
   * 
   * @method removeSource
   * @param {String} id the source's id
   * @return selectedSources
   */
  socket.on('removeSource', function(message) {
    message = JSON.parse(message);
    console.log('socket removeSource: ', message.id);
    queryManager.removeSource(message.id);
    socket.emit('selectedSources',
                JSON.stringify(queryManager.getSelectedSourcesList()));
  });
}

