var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var WordNetAPI = require('./APIs/WordNetAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid
 * Eesti Wordnetis.
 * 
 * @class thesMediator
 * @extends AbstractMediatorTemplate
 * @uses WordNetAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'thes';
mediator['abbr'] = 'EWN';
mediator['name'] = 'Eesti Wordnet';
mediator['API'] = new WordNetAPI('thes');
// mediator['processors'].push(controller);

module.exports = mediator;
