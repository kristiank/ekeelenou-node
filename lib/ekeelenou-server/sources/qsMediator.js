var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OldEkeelenouAPI = require('./APIs/OldEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid
 * Eesti õigekeelsussõnaraamatus.
 * 
 * @class qsMediator
 * @extends AbstractMediatorTemplate
 * @uses OldEkeelenouAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'qs';
mediator['abbr'] = 'ÕS';
mediator['name'] = 'Eesti õigekeelsussõnaraamat';
mediator['API'] = new OldEkeelenouAPI('qs');
// mediator['processors'].push(controller);

module.exports = mediator;
