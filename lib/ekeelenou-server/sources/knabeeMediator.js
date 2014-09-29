var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OEkeelenouAPI = require('./APIs/OEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Eesti kohanimede andmebaasis.
 * 
 * @class knabeeMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'knabee';
mediator['abbr'] = 'KNAB';
mediator['name'] = 'Eesti kohanimed';
mediator['API'] = new OEkeelenouAPI('knabee');
// mediator['processors'].push(controller);

module.exports = mediator;
