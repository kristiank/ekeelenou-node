var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OEkeelenouAPI = require('./APIs/OEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Inglise-eesti masintõlkesõnastikus.
 * 
 * @class iesMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'ies';
mediator['abbr'] = 'IES';
mediator['name'] = 'Inglise-eesti masintõlkesõnastik';
mediator['API'] = new OEkeelenouAPI('ies');
// mediator['processors'].push(controller);

module.exports = mediator;
