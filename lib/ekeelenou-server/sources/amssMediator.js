var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var EkeelenouAPI = require('./APIs/EkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Ametniku soovitussõnastikus.
 * 
 * @class amssMediator
 * @extends AbstractMediatorTemplate
 * @uses EkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'amss';
mediator['abbr'] = 'AMSS';
mediator['name'] = 'Ametniku soovitussõnastik';
mediator['API'] = new EkeelenouAPI('ass'); // @todo: kas ei peaks olema amss?
// mediator['processors'].push(controller);

module.exports = mediator;
