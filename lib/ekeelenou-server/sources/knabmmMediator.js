var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OldEkeelenouAPI = require('./APIs/OldEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Maailma kohanimede andmebaasis.
 * 
 * @class knabmmMediator
 * @extends AbstractMediatorTemplate
 * @uses OldEkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'knabmm';
mediator['abbr'] = 'KNAB';
mediator['name'] = 'Maailma kohanimed';
mediator['API'] = new OldEkeelenouAPI('knabmm');
// mediator['processors'].push(controller);

module.exports = mediator;
