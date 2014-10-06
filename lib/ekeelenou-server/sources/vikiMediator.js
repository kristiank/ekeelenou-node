var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var MediaWikiAPI = require('./APIs/MediaWikiAPI');
var controller = require('./processors/wikiProc');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Eesti Vikipeedias.
 * Juhul kui täpse nimega artiklit ei leitud, tehakse avatud päring.
 * 
 * @class vikiMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'viki';
mediator['abbr'] = 'Vikipeedia';
mediator['name'] = 'Eesti Vikipeedia';
mediator['API'] = new MediaWikiAPI('https://et.wikipedia.org/w/api.php');
mediator['processors'].push(controller);

module.exports = mediator;
