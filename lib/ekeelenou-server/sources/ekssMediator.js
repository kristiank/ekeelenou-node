var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OldEkeelenouAPI = require('./APIs/OldEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Eesti keele seletavas sõnaraamatus.
 * 
 * @class ekssMediator
 * @extends AbstractMediatorTemplate
 * @uses OldEkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'ekss';
mediator['abbr'] = 'EKSS';
mediator['name'] = 'Eesti keele seletav sõnaraamat';
mediator['API'] = new OldEkeelenouAPI('ekss');
// mediator['processors'].push(controller);

module.exports = mediator;
