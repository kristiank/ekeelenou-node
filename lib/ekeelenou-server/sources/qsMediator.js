var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var OEkeelenouAPI = require('./APIs/OEkeelenouAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid
 * Eesti õigekeelsussõnaraamatus.
 * 
 * @class qsMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'qs';
mediator['abbr'] = 'ÕS';
mediator['name'] = 'Eesti õigekeelsussõnaraamat';
mediator['API'] = new OEkeelenouAPI('qs');
// mediator['processors'].push(controller);

module.exports = mediator;
