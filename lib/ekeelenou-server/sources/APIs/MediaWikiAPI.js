var utils = require('../../../utils');
var qxhr = require('../../promiseXHR');

/**
 * Fasaad mis võimaldab teha päringuid Eesti Vikipeedia veebi API kaudu.
 * 
 * Juhul kui tavaotsing ei leia samanimelist artiklit, siis sooritatakse päring
 * veebi API kaudu avatud otsingu (open search).
 * 
 * @class MediaWikiAPI
 * @params {String} [url] MediaWiki web API url (defaults to Estonian Wikipeedia)
 * @constructor
 */
var MediaWikiAPI = function(url) {
  var self = this;
  // kasuta vaikimisi Eesti Vikipeediat
  url = url || 'https://et.wikipedia.org/w/api.php';
  
  /**
   * Makes an open search on the MediaWiki API
   * This is used as a fallback when direct queries find no results
   * 
   * @method openSearch
   * @param {String} query string
   * @param [params] optional parameters
   * @return {promise} promise for results
   */
  this.openSearch = function(query_str, params) {
    var deferred;
    
    // define default parameters
    if (typeof params === 'undefined') {
      params = {};
      params['action'] = 'opensearch';
      //params['limit']    = 20; // Maximum amount of results
      //params['namespace']= 0; // Namespaces to search
      params['format']   = 'json'; // The format of the output
    }
    params['search']   = query_str; // Search string
    
    params['callback'] = 'jsonp';
    
    // teeme parameetritest massiivi
    var paramsArray = utils.ObjKeyValuesToArray(params);
    var path = url + '?' + paramsArray.join('&');
    
    // tee xhr päring
    deferred = qxhar.read(path);
    
    /*
      @todo: peaks panema xhrFields ka!
      xhrFields: {
        'withCredentials': true, // needed for Cross-Origin Requests
        'User-Agent': 'EKIbot/0.9 (+http://kn.eki.ee/)' // API bot best practices 
      }
    });*/
    
    deferred.then(function done(data) {
      // märgistame päringu vastuse 'opensearch'iga
      return {'opensearch': data};
    });
    
    return deferred;
  };
  
  /**
   * Make a query to the open MediaWiki API
   * See https://et.wikipedia.org/w/api.php for descriptions
   * and also http://www.mediawiki.org/wiki/Manual:CORS 
   * 
   * @method query
   * @param {String} query_str
   * @param [params] optional parameters
   * @return {promise} promise for results
   */
  this.query = function(query_str, params) {
    var deferred;
    
    // define default parameters
    if (typeof params === 'undefined') {
      params = {};
      params['action']          = 'query'; // make a query
      params['prop']            = 'extracts'; // get page content extract
      params['prop']           += '|categories'; // and page's categories
      //params['exintro']         = null; // extract only the first paragraph
      params['exsentences']     = 1;
      //params['explaintext']     = null; // extract as plaintext
      params['redirects']       = ''; //null; // handle redirects automatically
      params['format']          = 'json';
      params['cllimit']         = 10; // maximum 10 categories
      params['exlimit']         = 1; // maximum 10 extracts  
      params['indexpageids']    = ''; //null; // get a list of pageIds separately
      params['maxlag']          = 10; // don't request if there is a 10 sec lag
      //params['origin']          = location.origin; // needed for Cross-Origin Requests
    }
    
    params['titles'] = query_str; // append the query string
    
    // teeme parameetrid massiiviks ...
    var paramsArray = utils.ObjKeyValuesToArray(params);
    var path = url + '?' + paramsArray.join('&');
    // tee xhr päring rajale
    deferred = qxhr.read(path);

    /*
      @todo: peaks panema xhrFields ka!
      xhrFields: {
        'withCredentials': true, // needed for Cross-Origin Requests
        'User-Agent': 'EKIbot/0.9 (+http://kn.eki.ee/)' // API bot best practices 
      }
    });*/
    
    // päring tehakse lubadusega, kui lubadus täitub, siis tee .then
    deferred.then(function done(data) {
      if ('-1' in data['query']['pages']) {
      // if nothing precise was found, make an open search instead
        return self.openSearch(query_str);
      } else {
        // the returned Wikipedia API datamodel is fine, just send it back
        return data;
      }
    });
    return deferred;
  };
};

module.exports = MediaWikiAPI;
