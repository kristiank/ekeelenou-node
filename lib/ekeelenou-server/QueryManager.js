var q = require("q");
var sourceManager = require('./sourceManager');

/**
 * QueryManager is used to query user selected sources. An initial list of
 * sources can be given, otherwise all registered sources will be used.
 * 
 * @class QueryManager
 * @constructor
 * @param {Array} [initSourcesList] algne allikate nimekiri
 */
var QueryManager = function(initSourcesList) {
  var selectedSourcesList = initSourcesList || sourceManager.getAllSourcesList();
  
  /**
   * Queries all currently selected sources or the sources given in
   * the sourceList parameter.
   * 
   * @method query
   * @param {String} queryString
   * @param [queryParams] global query parameters
   * @param {Array} [sourcesList] list of sources to query
   * @return {Array} promises
   */
  function query(queryString, queryParams, sourcesList) {
    var i, sourceName, promise, promises = [];
    
    // juhul kui sourcesList'i pole, siis kasutame QueryManager'i enda oma
    sourcesList = sourcesList || selectedSourcesList;
    
    for (i=0; i<sourcesList.length; i+=1) {
      sourceName = sourcesList[i];

      promise = sourceManager.getSource(sourceName).query(queryString, queryParams);
      promise = q(promise); // igaks juhuks muudab mitte-lubadused lubadusteks
      
      promises.push(promise);
    }
    // return the array of promises
    return promises;
  }
  
  /**
   * Returns the list of currently selected sources
   * 
   * @method getSelectedSourcesList
   * @return {Array} selectedSourcesList
   */
  function getSelectedSourcesList() {
    return selectedSourcesList;
  }
  
  /**
   * Adds a source to be queried. Returns boolean if added or not.
   * 
   * @method addSource
   * @param {String} sourceId
   * @return {Boolean} wasAdded
   */
  function addSource(sourceId) {
    sourceId = sourceId.trim();
    // add only if the source name exists in sources AND is not selected
    if( sourceManager.getAllSourcesList().indexOf(sourceId) !== -1 &&
        selectedSourcesList.indexOf(sourceId) === -1) {
      selectedSourcesList.push(sourceId);
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * Removes a source from being queried. Returns boolean if existed or not.
   * 
   * @method removeSource
   * @param {String} sourceId
   * @return {Boolean} wasRemoved
   */
  function removeSource(sourceId) {
    sourceId = sourceId.trim();
    var index = selectedSourcesList.indexOf(sourceId);
    
    // remove only if the source name was previously selected
    if( index !== -1 ) {
      selectedSourcesList.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
  
  /* The public interface */
  return {
    'query': query,
    'getSelectedSourcesList': getSelectedSourcesList,
    'addSource': addSource,
    'removeSource': removeSource
  };
};

module.exports = QueryManager;
