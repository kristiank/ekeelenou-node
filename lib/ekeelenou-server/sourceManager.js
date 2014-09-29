/**
 * This is the system-wide "Source Manager"
 * 
 * @class sourceManager
 * @constructor
 */

var registeredSources = {}; //Object.create(null);
/**
 * Registers a sourceMediator so it can be accessible from the site's
 * global sources by e.g the QueryManager.
 * 
 * @method register
 * @param {sourceMediator} sourceMediator the sourceMediator object
 * @return {boolean} wasRegistered was registered successfully
 */
function register(sourceMediator) {
  // @todo: ducktype for sane sourceMediator
  if (!sourceMediator.hasOwnProperty('id')) {
    // @todo: throw error
  } else if (!sourceMediator.hasOwnProperty('abbr')) {
    // @todo: throw error
  } else if (!sourceMediator.hasOwnProperty('name')) {
    // @todo: throw error
  } else if (!sourceMediator.hasOwnProperty('query')) {
    // @todo: throw error
  }
  // only register if same ID is not registered yet
  if (idIsRegistered(sourceMediator.id)) {
    return false;
  }
  registeredSources[sourceMediator.id] = sourceMediator;
  return true;
};

/**
 * Returns true if the id allready exists in the sources, returns
 * false otherwise
 * 
 * @method idExists
 * @param {String} id
 * @return {boolean} idExists
 */
function idIsRegistered(id) {
  if (registeredSources.hasOwnProperty(id)) {
    // @todo: log warning sourceMediator allready exists in sources
    return true;
  } else {
    return false;
  }
}

/**
 * Returns a list of all source's names
 * 
 * @method getAllSourcesList
 * @return {Array} sourcesList array with source's IDs
 */
function getAllSourcesList() {
  return Object.keys(registeredSources);
}

/**
 * Returns the actual sourceMediator with the given id
 * 
 * @method getSource
 * @param {string} id
 * @return {sourceMediator} sourceMediator
 */
function getSource(id) {
  if(idIsRegistered(id)) {
    return registeredSources[id];
  } else {
    throw Error('No such source exists!');
  }
}

/* public interface */
exports.getAllSourcesList = getAllSourcesList;
exports.idIsRegistered = idIsRegistered;
exports.register = register;
exports.getSource = getSource;
