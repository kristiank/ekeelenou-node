var q = require("q");
var utils = require("../../utils");

/**
 * This defines an template for all mediators to use
 * 
 * @class AbstractMediatorTemplate
 * @constructor
 */
function AbstractMediatorTemplate() {
    if (!(this instanceof AbstractMediatorTemplate)) {
        console.log("WARNING: AbstractMediatorTemplate created without New operator");
        return new AbstractMediatorTemplate();
    }
    
    /**
     * Andmete töötlejad registreeritakse sellesse massiivi, näiteks:
     * ```mediator['processors'].push(proc1);```
     * 
     * @property {Array} processors
     */
    this.processors = [];
    this.id = null;
    this.name = null;
    this.abbr = null;
    this.data = {};
    this.details = {};
}

AbstractMediatorTemplate.prototype = {
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
    constructor: AbstractMediatorTemplate,
    
    query: function(queryString, queryParams) {
        if(!this.API) {
            throw new Error('No API is defined!');
        } else {
            var self = this;
            var stopwatch = new utils.StopWatch();
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
                    message['details'] = {};
                    message['details']['API-time'] = stopwatch.sinceLast();
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
                message['details']['Proc-time'] = stopwatch.sinceLast();
                return message;
            });
            var finalPromise = procPromises.all();
            
            return finalPromise;
        }
    }
};

module.exports = AbstractMediatorTemplate;