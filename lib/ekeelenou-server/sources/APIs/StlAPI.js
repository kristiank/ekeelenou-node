/**
 * Facade to the site's general logging facility API
 * @ todo: nimetada ümebr LogAPIks???
 * @class StlAPI
 * @param rid
 */
exports.StlAPI = function(rid) {
	this.id = rid;
	var pars = {R: rid };

	/**
	 * Make a query (actually it saves the query in the log)
	 * 
	 * @method query
	 * @param query_str
	 * @param [params]
	 * @return {promise}
	 */
	this.query = function(query_str, params) {
		$.extend(pars, {u: app.uid});
		$.extend(pars, params || {});
		$.extend(pars, {Q: query_str});
		return $.getJSON("http://kn.eki.ee/stl.php", pars); //return promise
	};
};