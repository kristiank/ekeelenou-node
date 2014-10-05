var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OldEkeelenouAPI = require('./APIs/OldEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Inglise-eesti masintõlkesõnastikus.
 * 
 * @class iesMediator
 * @extends AbstractMediatorTemplate
 * @uses OldEkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'ies';
mediator['abbr'] = 'IES';
mediator['name'] = 'Inglise-eesti masintõlkesõnastik';
mediator['API'] = new OldEkeelenouAPI('ies');
// mediator['processors'].push(controller);

module.exports = mediator;
