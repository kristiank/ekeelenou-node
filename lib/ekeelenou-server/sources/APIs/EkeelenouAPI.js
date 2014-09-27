/**
 * Facade for the EKI e-keelenõu dictionary API
 * (serves etümoloogia, ametnik)
 * 
 * @class SourceEknAPI
 * @param rid
 */
exports.SourceEknAPI = function(rid) {
	this.id = rid;
	var pars = {R: rid};
	var res;
	
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
		$.extend(pars, params || {});
		$.extend(pars, {Q: query_str});
		return $.getJSON("http://www.eki.ee/ekeeleabi/api.cgi", pars); //return promise
	};
};