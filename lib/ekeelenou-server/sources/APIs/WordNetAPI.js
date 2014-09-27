/**
 * Facade for the Estonian WordNet API
 * 
 * @class SourceThesAPI
 * @param rid
 */
exports.SourceThesAPI = function(rid) {
	this.id = rid;
	var pars = {R: rid};
	
	/**
	 * Make a query
	 * 
	 * @method query
	 * @param query_str
	 * @param params
	 * @return {promise}
	 */
	this.query = function(query_str, params) {
		$.extend(pars, params || {});
		$.extend(pars, {sone: query_str});
		return $.getJSON("http://eki.ee/elgar/ekeel/related.cgi", pars); //return promise
	};
};