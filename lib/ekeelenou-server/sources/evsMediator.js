var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OEkeelenouAPI = require('./APIs/OEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Eesti-vene sõnaraamatus.
 * 
 * @class evsMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'evs';
mediator['abbr'] = 'EVS';
mediator['name'] = 'Eesti-vene sõnaraamat';
mediator['API'] = new OEkeelenouAPI('evs');
// mediator['processors'].push(controller);

module.exports = mediator;
