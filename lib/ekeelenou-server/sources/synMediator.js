var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OEkeelenouAPI = require('./APIs/OEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Sünonüümisõnastikus.
 * 
 * @class synMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'syn';
mediator['abbr'] = 'SÜN';
mediator['name'] = 'Sünonüümisõnastik';
mediator['API'] = new OEkeelenouAPI('syn');
// mediator['processors'].push(controller);

module.exports = mediator;
