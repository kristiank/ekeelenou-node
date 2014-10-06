var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var EkeelenouAPI = require('./APIs/EkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Etümoloogia sõnastikus.
 * 
 * @class etyMediator
 * @extends AbstractMediatorTemplate
 * @uses EkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'ety';
mediator['abbr'] = 'ETÜ';
mediator['name'] = 'Etümoloogia sõnastik';
mediator['API'] = new EkeelenouAPI('ety');
// mediator['processors'].push(controller);

module.exports = mediator;
