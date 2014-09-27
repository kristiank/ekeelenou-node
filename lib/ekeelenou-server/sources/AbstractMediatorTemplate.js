/**
 * This defines an template for all mediators to use
 * 
 * @module AbstractMediatorTemplate
 * @constructor
 */
function AbstractMediatorTemplate() {

}

AbstractMediatorTemplate.prototype = {
    //constructor: AbstractMediatorTemplate

    /**
     * Embeds the data in a message convolute with the Mediator's
     * 'id', 'name' and 'abbr'. The data is placed in 'data'.
     * 
     * @method addClientMessageDetail
     * @static
     * @param {Object} data
     * @return {Object} message
     */
    addClientMessageDetails: function(data) {
        var message     = {};
        message['id']   = this.id;
        message['name'] = this.name;
        message['abbr'] = this.abbr;
        message['data'] = data;
        
        return message;
    },
    
    /**
     * See on mediaatori päringu-žabloon (Template):
     * 1. saada päring APIsse
     * 2. paki APIst saadud andmed kliendi jaoks sõnumiks (queryData)
     * 3. käivita registreeritud vastuse töötlejad
     * 
     * @method query
     * @param {String} queryString
     * @param [queryParams]
     * @return {promise} queryData message for client
     */
    query: function(queryString, queryParams) {
        if(!this.API) {
            throw new Error('No API is defined!');
        } else {
            var self = this;
            var APIPromise = this.API.query(queryString, queryParams);
            //finalPromise = APIPromise.then(this.prototype.addClientMessageDetails(data););
            var finalPromise = APIPromise.then(
                function(data) {
                    var message = {};
                    message['id']   = self.id;
                    message['name'] = self.name;
                    message['abbr'] = self.abbr;
                    message['data'] = data;
                    return message;
                }
            );
            return finalPromise;
        }
    }
};

module.exports = AbstractMediatorTemplate;