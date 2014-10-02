var q = require("q");
/**
 * This defines an template for all mediators to use
 * 
 * @class AbstractMediatorTemplate
 * @constructor
 */
function AbstractMediatorTemplate() {
    /**
     * Andmete töötlejad registreeritakse sellesse massiivi, näiteks:
     * ```mediator['processors'].push(proc1);```
     * 
     * @property {Array} processors
     */
    this.processors = [];
}

AbstractMediatorTemplate.prototype = {
    /**
     * Embeds the data in a message convolute with the Mediator's
     * 'id', 'name' and 'abbr'. The data is placed in 'data'.
     * 
     * @method addClientMessageDetail
     * @deprecated
     * @static
     * @param {Object} self usually would be the caller's "this"
     * @param {Object} data
     * @return {Object} message
     */
    addClientMessageDetails: function(self, data) {
        var message     = {};
        message['id']   = self.id;
        message['name'] = self.name;
        message['abbr'] = self.abbr;
        message['data'] = data;
        
        return message;
    },
    
    /**
     * See on mediaatori päringu-žabloon (Template):
     * 1. saada päring APIsse
     * 2. paki APIst saadud andmed kliendi jaoks sõnumiks (queryData)
     * 3. töötle andmed registreeritud vastuse töötlejatega
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
            /* 1. saada päring APIsse */
            var APIPromise = this.API.query(queryString, queryParams);
            
            /* 2. paki APIst saadud andmed kliendi jaoks sõnumiks (queryData) */
            //finalPromise = APIPromise.then(this.prototype.addClientMessageDetails(self, data););
            var msgPromise = APIPromise.then(
                function(data) {
                    // error checking
                    if(!self.id) throw new Error('Mediator has no \'id\' defined!');
                    if(!self.name) throw new Error('Mediator has no \'name\' defined!');
                    if(!self.abbr) throw new Error('Mediator has no \'abbr\' defined!');
                    // no errors, let's create the message
                    var message = {};
                    message['id']   = self.id;
                    message['name'] = self.name;
                    message['abbr'] = self.abbr;
                    message['data'] = data;
                    return message;
                }
            );
            
            /* 3. töötle andmed registreeritud vastuse töötlejatega */
            //if (typeof this.processors !== 'array') throw new Error('Mediator \'processors\' is not an array!');
            //@todo: vahetöötlused peaks ka tegema lubadustega, aga kuidas?
            var procPromises = msgPromise.then(function(message) {
                console.log('self.processors.length:', self.processors.length);
                for (var i=0; i<self.processors.length; i+=1) {
                    console.log('proc data', message['data']);
                    message['data'] = self.processors[i](message['data']);
                }
                return message;
            });
            var finalPromise = procPromises.all();
            
            return finalPromise;
        }
    }
};

module.exports = AbstractMediatorTemplate;