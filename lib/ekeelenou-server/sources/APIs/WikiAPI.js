/**
 * Facade for querying the Estonian Wikipedia API
 * 
 * @class SourceWikiEstAPI
 * @param rid
 */
var SourceWikiEstAPI = function(rid) {
  this.id = rid;
  var self = this;
  var url = 'https://et.wikipedia.org/w/api.php';
  
  /**
   * Make an open search on MediaWiki API
   * This is used when direct queries find no results
   */
  this.openSearch = function(query_str, params) {
    var promise;
    
    // define default parameters
    if (typeof params === 'undefined') {
      params = {};
      params['action'] = 'opensearch';
      //params['limit']    = 20; // Maximum amount of results
      //params['namespace']= 0; // Namespaces to search
      params['format']   = 'json'; // The format of the output
    }
    params['search']   = query_str; // Search string
    
    // make the ajax request to the wikipedia API
    promise = $.ajax({
      url: url,
      dataType: 'jsonp', // needed for Cross-Origin Requests
      cache: true, // needed because dataType is 'jsonp'
      data: params,
      xhrFields: {
        'withCredentials': true, // needed for Cross-Origin Requests
        'User-Agent': 'EKIbot/0.9 (+http://kn.eki.ee/)' // API bot best practices 
      }
    });
    
    return promise.then(function done(data) {
      return {'opensearch': data};
    });
  };
  
  /**
   * Make a query to the open MediaWiki API
   * See https://et.wikipedia.org/w/api.php for descriptions
   * and also http://www.mediawiki.org/wiki/Manual:CORS 
   * 
   * @method query
   * @param query_str
   * @param [params]
   * @return promise
   */
  this.query = function(query_str, params) {
    var promise;
    
    // define default parameters
    if (typeof params === 'undefined') {
      params = {};
      params['action']          = 'query'; // make a query
      params['prop']            = 'extracts'; // get page content extract
      params['prop']           += '|categories'; // and page's categories
      //params['exintro']         = null; // extract only the first paragraph
      params['exsentences']     = 1;
      //params['explaintext']     = null; // extract as plaintext
      params['redirects']       = null; // handle redirects automatically
      params['format']          = 'json';
      params['cllimit']         = 10; // maximum 10 categories
      params['exlimit']         = 10; // maximum 10 extracts  
      params['indexpageids']    = null; // get a list of pageIds separately
      params['maxlag']          = 10; // don't request if there is a 10 sec lag
      //params['origin']          = location.origin; // needed for Cross-Origin Requests
    }
    
    params['titles'] = query_str; // append the query string
    
    // make the ajax request to the wikipedia API
    promise = $.ajax({
      url: url,
      dataType: 'jsonp', // needed for Cross-Origin Requests
      cache: true, // needed because dataType is 'jsonp'
      data: params,
      xhrFields: {
        'withCredentials': true, // needed for Cross-Origin Requests
        'User-Agent': 'EKIbot/0.9 (+http://kn.eki.ee/)' // API bot best practices 
      }
    });
    
    return promise.then(function done(data) {
      // if nothing precise was found, make an open search instead
      if ('-1' in data['query']['pages']) {
        return self.openSearch(query_str);
      } else {
        // the returned Wikipedia API datamodel is fine, just send 
        // it to RGWikiEst.procResponse @todo: kuhu saadetakse?
        return data;
      }
    });
  };
};

exports.WikiAPI = SourceWikiEstAPI;
