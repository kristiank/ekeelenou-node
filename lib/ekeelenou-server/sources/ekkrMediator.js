var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OldEkeelenouAPI = require('./APIs/OldEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Eesti Keele Käsiraamatus.
 * 
 * @class ekkrMediator
 * @extends AbstractMediatorTemplate
 * @uses OldEkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'ekkr';
mediator['abbr'] = 'EKKR';
mediator['name'] = 'Eesti Keele Käsiraamat';
mediator['API'] = new OldEkeelenouAPI('ekkr');
// mediator['processors'].push(controller);

module.exports = mediator;
