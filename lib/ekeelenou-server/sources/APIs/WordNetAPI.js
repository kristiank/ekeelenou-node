var utils = require('../../../utils');
var ajax = require("../../../qxhr");

/**
 * Facade for the Estonian WordNet API
 * 
 * @class WordNetAPI
 * @param rid ID of the resource ('thes')
 */
function WordNetAPI(rid) {
	if (!(this instanceof WordNetAPI)) {
		console.log("WARNING: WordNetAPI created without New operator");
		return new WordNetAPI(rid);
	}
	
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
		
		// tee xhr päring rajale
		APIPromise = ajax.get(path);
		
		return APIPromise;
	};
};

module.exports = WordNetAPI;