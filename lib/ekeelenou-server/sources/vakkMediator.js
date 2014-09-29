var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OEkeelenouAPI = require('./APIs/OEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Keelenõuvakas
 * 
 * @class vakkMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'vakk';
mediator['abbr'] = 'KNV';
mediator['name'] = 'Keelenõuvakk';
mediator['API'] = new OEkeelenouAPI('vakk');
// mediator['processors'].push(controller);

module.exports = mediator;
