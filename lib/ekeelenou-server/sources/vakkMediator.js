var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OldEkeelenouAPI = require('./APIs/OldEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Keelenõuvakas
 * 
 * @class vakkMediator
 * @extends AbstractMediatorTemplate
 * @uses OldEkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'vakk';
mediator['abbr'] = 'KNV';
mediator['name'] = 'Keelenõuvakk';
mediator['API'] = new OldEkeelenouAPI('vakk');
// mediator['processors'].push(controller);

module.exports = mediator;
