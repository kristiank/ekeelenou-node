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