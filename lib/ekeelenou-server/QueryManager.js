sources = require('./sources');

/**
 * QueryManager is used to query user selected sources. The list of sources
 * can be changed.
 */
var QueryManager = function(defaultSourcesList) {
  var selectedSourcesList = defaultSourcesList || sources.getAllSourcesList();
  
  /**
   * Queries all currently selected sources or the sources given in
   * the sourceList parameter.
   * 
   * @method query
   * @param {String} queryString
   * @param {Object} [queryParams] global query parameters
   * @param {List} [sourcesList] list of sources to query
   */
  function query(queryString, queryParams, sourcesList) {
    var i, sourceName;
    
    sourcesList = sourcesList || selectedSourcesList;
    
    for (i=0; i<sourcesList.length; i+=1) {
      sourceName = sourcesList[i];
      sources.getSource(sourceName).query(queryString, queryParams);
    }
  }
  
  /**
   * Returns the list of currently selected sources
   * 
   * @method getSelectedSourcesList
   * @returns {List} selectedSourcesList
   */
  function getSelectedSourcesList() {
    return selectedSourcesList;
  }
  
  /**
   * Adds a source to be queried. Returns boolean if added or not.
   * 
   * @method addSource
   * @param {String} sourceName
   * @return {Boolean} wasAdded
   */
  function addSource(sourceName) {
    sourceName = sourceName.trim();
    // add only if the source name exists in sources
    if( sources.getAllSourcesList().indexOf(sourceName) !== -1 ) {
      selectedSourcesList.push(sourceName);
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * Removes a source from being queried. Returns boolean if existed or not.
   * 
   * @method removeSource
   * @param {String} sourceName
   * @return {Boolean} wasRemoved
   */
  function removeSource(sourceName) {
    sourceName = sourceName.trim();
    var index = selectedSourcesList.indexOf(sourceName);
    
    // remove only if the source name is previously selected
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
