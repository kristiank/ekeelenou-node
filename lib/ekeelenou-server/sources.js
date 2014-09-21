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
 * @param {string} id
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

/*
var sources = {
  qs:     {id: 'qs', cls: SourceOTest, abbr: 'ÕS', name: 'Eesti õigekeelsussõnaraamat'},
  ekss:   {id: 'ekss', cls: SourceOTest, abbr: 'EKSS', name: 'Eesti keele seletav sõnaraamat'},
  vakk:   {id: 'vakk', cls: SourceOTest, abbr: 'KNV', name: 'Keelenõuvakk'},
  ekkr:   {id: 'ekkr', cls: SourceOTest, abbr: 'EKKR', name: 'Eesti Keele Käsiraamat'},
  ies:    {id: 'ies', cls: SourceOTest, abbr: 'IES', name: 'Inglise-eesti masintõlkesõnastik'},
  evs:    {id: 'evs', cls: SourceOTest, abbr: 'EVS', name: 'Eesti-vene sõnaraamat'},
  knabee: {id: 'knabee', cls: SourceOTest, abbr: 'KNAB', name: 'Eesti kohanimed'},
  knabmm: {id: 'knabmm', cls: SourceOTest, abbr: 'KNAB', name: 'Maailma kohanimed'},
  syn:    {id: 'syn', cls: SourceOTest, abbr: 'SÜN', name: 'Sünonüümisõnastik'},
  thes:   {id: 'thes', cls: SourceThesAPI, abbr: 'EWN', name: 'Eesti Wordnet'},
  ass:    {id: 'ass', cls: SourceEknAPI, abbr: 'ASS', name: 'Ametniku soovitussõnastik'},
  ety:    {id: 'ety', cls: SourceEknAPI, abbr: 'ETÜ', name: 'Etümoloogia sõnastik'},
  stl:    {id: 'stl', cls: StlAPI, abbr: 'stl'},
  WikiEst:{id: 'WikiEst', cls: SourceWikiEstAPI, abbr: 'Vikipeedia', name: 'Eesti Vikipeedia'}
};
*/
/*
var sources = {
  qs:     {id: 'qs', abbr: 'ÕS', name: 'Eesti õigekeelsussõnaraamat'},
  ekss:   {id: 'ekss', abbr: 'EKSS', name: 'Eesti keele seletav sõnaraamat'},
  vakk:   {id: 'vakk', abbr: 'KNV', name: 'Keelenõuvakk'},
  ekkr:   {id: 'ekkr', abbr: 'EKKR', name: 'Eesti Keele Käsiraamat'},
  ies:    {id: 'ies', abbr: 'IES', name: 'Inglise-eesti masintõlkesõnastik'},
  evs:    {id: 'evs', abbr: 'EVS', name: 'Eesti-vene sõnaraamat'},
  knabee: {id: 'knabee', abbr: 'KNAB', name: 'Eesti kohanimed'},
  knabmm: {id: 'knabmm', abbr: 'KNAB', name: 'Maailma kohanimed'},
  syn:    {id: 'syn', abbr: 'SÜN', name: 'Sünonüümisõnastik'},
  thes:   {id: 'thes', abbr: 'EWN', name: 'Eesti Wordnet'},
  ass:    {id: 'ass', abbr: 'ASS', name: 'Ametniku soovitussõnastik'},
  ety:    {id: 'ety', abbr: 'ETÜ', name: 'Etümoloogia sõnastik'},
  stl:    {id: 'stl', abbr: 'stl'},
  WikiEst:{id: 'WikiEst', abbr: 'Vikipeedia', name: 'Eesti Vikipeedia'}
};
*/

/**
 * Returns a list of all source's names
 * 
 * @method getAllSourcesList
 * @return {List} sourcesList array of sourcenames
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
