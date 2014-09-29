var utils = require('../../../utils');
var ajax = require("../../../qxhr");
var q = require('q');

/**
 * Facade for the Estonian WordNet API
 * 
 * @class SourceThesAPI
 * @param rid
 */
var WordNetAPI = function(rid) {
	this.id = rid;
	var url = "http://eki.ee/elgar/ekeel/related.cgi";
	var pars = {R: rid}; // 'thes'
	
	/**
	 * Make a query
	 * 
	 * @method query
	 * @param query_str
	 * @param params
	 * @return {promise}
	 */
	this.query = function(query_str, params) {
		var APIPromise;
		
		// $.extend(pars, params || {}); // @todo: NB!
		pars['sone'] = query_str;
		
		// teeme parameetrid massiiviks ...
		var paramsArray = utils.ObjKeyValuesToArray(pars);
		var path = url + '?' + paramsArray.join('&');
		console.log('ajaksitud: ', path);
		// tee xhr päring rajale
		APIPromise = ajax.get(path);
		
		return APIPromise;
	};
};

module.exports = WordNetAPI;