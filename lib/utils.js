/**
 * Lihtsaid vajaminevaid asju
 * 
 * @module utils
 * @class utils
 * @static
 */

/**
 * Flattens an Object's key-value pairs into an array of
 * 'key=value' strings
 * 
 * @method ObjKeyValuesToArray
 * @param {Object} obj
 * @return {Array} arr
 */
exports.ObjKeyValuesToArray = function(obj) {
    var arr = [];
    
    Object.getOwnPropertyNames(obj).forEach(
        function(val, idx, array) {
            arr.push(val + '=' + encodeURIComponent(obj[val]));
        }
    );
    
    return arr;
};

/** A simple StopWatch
 * 
 * @class StopWatch
 * @constructor
 */
exports.StopWatch = function() {
	this.start = new Date().getTime();
	this.end = this.start;
	
	/**
	 * Returns milliseconds since the StopWatch started
	 * @method get
	 * @return {number} 
	 */
	this.get = function() {
		this.end = new Date().getTime();
		return this.end - this.start;
	};
	
	/**
	 * Returns milliseconds since the StopWatch last was watched
	 * @method get
	 * @return {number} 
	 */
	this.sinceLast = function() {
		var now = new Date().getTime();
		var since = now - this.end;
		this.end = now;
		return since;
	};
}