var utils = require('../../../utils');
var ajax = require("../../../qxhr");
var q = require('q');

/**
 * Fasaad mis võimaldab teha päringuid Eesti Vikipeedia veebi API kaudu.
 * 
 * Juhul kui tavaotsing ei leia samanimelist artiklit, siis sooritatakse päring
 * veebi API kaudu avatud otsingu (open search).
 * 
 * @class MediaWikiAPI
 * @param {String} [url] MediaWiki web API url (vaikimisi Eesti Vikipeedia)
 * @constructor
 */
var MediaWikiAPI = function(url) {
	if (!(this instanceof MediaWikiAPI)) {
		console.log("WARNING: MediaWikiAPI created without New operator");
		return new MediaWikiAPI(url);
	}
	
	var self = this;
	// kasuta vaikimisi Eesti Vikipeediat
	url = url || 'https://et.wikipedia.org/w/api.php';
	
	/**
	 * Sooritab avatud otsingu (open searh) MediaWiki veebi APIs.
	 * Seda kasutatakse juhul kui täpne päring ei leidnud artiklit.
	 * 
	 * @method openSearch
	 * @param {String} query string
	 * @param [params] optional parameters
	 * @return {promise} promise for results
	 */
	this.openSearch = function(query_str, params) {
		console.log('MAKING AN OPENSEARCH INSTEAD!');
		var qxhrPromise;
		var deferred = q.defer();
		
		// define default parameters
		if (typeof params === 'undefined') {
			params = {};
			params['action'] = 'opensearch';
			//params['limit']    = 20; // Maximum amount of results
			//params['namespace']= 0; // Namespaces to search
			params['format']   = 'json'; // The format of the output
		}
		params['search']   = query_str; // Search string
		
		params['callback'] = 'jsonp'; // @todo: enable JSONP!
		
		// teeme parameetritest massiivi
		var paramsArray = utils.ObjKeyValuesToArray(params);
		var path = url + '?' + paramsArray.join('&');
		
		console.log('promised path is: ', path);
		
		// tee xhr päring
		//qxhrPromise = qxhr.read(path);
		qxhrPromise = ajax.getJSON(url, params);
		
		/*
			@todo: peaks panema xhrFields ka!
			xhrFields: {
				'withCredentials': true, // needed for Cross-Origin Requests
				'User-Agent': 'EKIbot/0.9 (+http://kn.eki.ee/)' // API bot best practices 
			}
		});*/
		
		qxhrPromise.then(function (data) {
			// märgistame päringu vastuse 'opensearch'iga
			deferred.resolve({'opensearch': data});
		});
		
		return deferred.promise;
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
		var deferred = q.defer();
		var APIPromise;
		
		// define default parameters
		if (typeof params === 'undefined') {
			params = {};
			params['action']          = 'query'; // make a query
			params['prop']            = 'extracts'; // get page content extract
			params['prop']           += '|categories'; // and page's categories
			//params['exintro']         = null; // extract only the first paragraph
			params['exsentences']     = 1;
			params['explaintext']     = null; // extract as plaintext
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
		
		console.log(path);
		
		// tee xhr päring rajale
		APIPromise = ajax.get(path);
		//qxhrPromise = ajax.get(url, params); // @todo nii ei tööta ...
		
		/*
			@todo: peaks panema xhrFields ka!
			xhrFields: {
				'withCredentials': true, // needed for Cross-Origin Requests
				'User-Agent': 'EKIbot/0.9 (+http://kn.eki.ee/)' // API bot best practices 
			}
		});*/
		
		/* API päring tehakse lubadusega, kui lubadus täitub, siis vaadaatakse
		 * kas leiti midagi. Juhul kui ei leitud, tehakse laiendatud päring.
		 */
		APIPromise.then(function(data) {
			if (data['query']['pages'].hasOwnProperty('-1')) {
				// if nothing precise was found, make an open search instead
				// @todo: also disable the link to the 'global source' in the view
				deferred.resolve(self.openSearch(query_str));
			} else {
				// the returned Wikipedia API datamodel is fine, just send it back
				deferred.resolve(data);
			}
		});
		
		return deferred.promise;
	};
};

module.exports = MediaWikiAPI;
