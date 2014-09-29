var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OEkeelenouAPI = require('./APIs/OEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Maailma kohanimede andmebaasis.
 * 
 * @class knabmmMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'knabmm';
mediator['abbr'] = 'KNAB';
mediator['name'] = 'Maailma kohanimed';
mediator['API'] = new OEkeelenouAPI('knabmm');
// mediator['processors'].push(controller);

module.exports = mediator;
