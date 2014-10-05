var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OldEkeelenouAPI = require('./APIs/OldEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Eesti kohanimede andmebaasis.
 * 
 * @class knabeeMediator
 * @extends AbstractMediatorTemplate
 * @uses OldEkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'knabee';
mediator['abbr'] = 'KNAB';
mediator['name'] = 'Eesti kohanimed';
mediator['API'] = new OldEkeelenouAPI('knabee');
// mediator['processors'].push(controller);

module.exports = mediator;
