var utils = require('../../../utils');
var ajax = require("../../../qxhr");

/**
 * Facade for the *old* EKI e-keelenõu dictionary API
 * 
 * @class OEkeelenouAPI
 * @constructor
 * @param rid
 * @return OEKeelenouAPI
 */
var SourceOTest = function(rid) {
	this.id = rid;
	var pars = {R: rid};
	var url = "http://www.eki.ee/ekeeleabi/o_test.cgi";
	/**
	 * Make a query
	 * @method query
	 * @param query_str
	 * @param [params]
	 * @return {promise}
	 */
	this.query = function(query_str, params) {
		var APIPromise;
		
		// $.extend(pars, params || {}); // @todo: NB!
		pars['Q'] = query_str;
		
		// teeme parameetrid massiiviks ...
		var paramsArray = utils.ObjKeyValuesToArray(pars);
		var path = url + '?' + paramsArray.join('&');
		
		// tee xhr päring rajale
		APIPromise = ajax.get(path);
		
		return APIPromise.then( function(data) {
			if (data['lyhivaade'].length === 1 && 
					data['lyhivaade'][0] === 'Ei leidnud') {
				data.lyhivaade = [];
				data.taisvaade = [];
			}
			return data;
		});
	};
};

module.exports = SourceOTest;