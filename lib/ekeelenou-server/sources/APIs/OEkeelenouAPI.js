/**
 * Facade for the *old* EKI e-keelenõu dictionary API
 * 
 * @class SourceOTest
 * @param rid
 */
exports.SourceOTest = function(rid) {
	this.id = rid;
	var pars = {R: rid};
	
	/**
	 * Make a query
	 * @method query
	 * @param query_str
	 * @param [params]
	 * @return data
	 */
	this.query = function(query_str, params) {
		$.extend(pars, params || {});
		$.extend(pars, {Q: query_str});
		
		var p = $.getJSON("http://www.eki.ee/ekeeleabi/o_test.cgi", pars);
		
		return p.then(function done(data) {
			if (data['lyhivaade'].length === 1 && 
					data['lyhivaade'][0] === 'Ei leidnud') {
				data.lyhivaade = [];
				data.taisvaade = [];
			}
			return data;
		});
	};
};