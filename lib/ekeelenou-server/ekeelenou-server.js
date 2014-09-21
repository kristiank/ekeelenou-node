// siin on terve e-keelenõu serveripoolne loogika

// init

// registreerime kõik sourceMediatorid
var sources = require('./sources');
var estWikiMediator = require('./sources/estWikiMediator');
sources.register(estWikiMediator);

console.log('available sources: ', sources.getAllSourcesList());

/**
 * Each time someone connects, the user gets it's own socket. This
 * emulates a simple session.
 * 
 * Within this session, each user has its own
 * - queryManager -- for holding the list of selected sources
 * 
 * @method initUserSocket
 * @param io the global socket.io object
 * @param socket the personal socket
 */
exports.initUserSocket = function(io, socket) {
  console.log('opened a user socket with id: ', socket.id);
  
  // @todo: what should we do on disconnect?
  socket.on('disconnect', function(message) {
    console.log('disconnect on socket id: ', socket.id);
  });
  
  // igal kasutajal on oma QueryManager
  var queryManager = require('./QueryManager')();
  
  // on new connections, send a welcoming message
  // @todo: initialize a userSettings object or UID?
  socket.emit('queryData',
              JSON.stringify('juhtus io.sockets.on("connection")!'));
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
  socket.on('query', function(message) {
    message = JSON.parse(message);
    console.log('socket query: ', message);
    console.log('with selected sources: ', 
      queryManager.getSelectedSourcesList());
    queryManager.query(message.queryString);
    socket.emit('queryData',
                JSON.stringify('<div>Leitud leiud sellised: ' +
                message.queryString + '</div>'));
  });
  
  /**
   * Selects a source. This message is forwarded to the QueryManager.
   * 
   * @method addSource
   * @param {string} id the source's id
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
   * @param {string} id the source's id
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

