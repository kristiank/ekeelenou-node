var utils = require('../../../utils');
var ajax = require("../../../qxhr");

/**
 * Facade for the EKI e-keelenõu dictionary API
 * (serves etümoloogia, ametnik)
 * 
 * @class EkeelenouAPI
 * @constructor
 * @param rid ID of the resource
 * @return EKeelenouAPI
 */
function EkeelenouAPI(rid) {
	this.id = rid;
	var pars = {R: rid};
	var res;
	var url = "http://www.eki.ee/ekeeleabi/api.cgi";
	
	/**
	 * Initialises the API
	 * 
	 * @method init
	 * @deprecated ?
	 * @return 
	 */
	this.init = function() {
		res = $.getJSON("http://www.eki.ee/ekeeleabi/api.cgi", pars);
	};
	
	/**
	 * Make a query
	 * 
	 * @method query
	 * @param query_str
	 * @param [params]
	 * @return 
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
		
		// $.extend(pars, params || {});
		// $.extend(pars, {Q: query_str});
		// return $.getJSON("http://www.eki.ee/ekeeleabi/api.cgi", pars); //return promise
		return APIPromise;
	};
}

module.exports = EkeelenouAPI;