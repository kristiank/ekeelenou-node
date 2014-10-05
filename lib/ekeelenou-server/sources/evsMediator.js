var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OldEkeelenouAPI = require('./APIs/OldEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Eesti-vene sõnaraamatus.
 * 
 * @class evsMediator
 * @extends AbstractMediatorTemplate
 * @uses OldEkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'evs';
mediator['abbr'] = 'EVS';
mediator['name'] = 'Eesti-vene sõnaraamat';
mediator['API'] = new OldEkeelenouAPI('evs');
// mediator['processors'].push(controller);

module.exports = mediator;
