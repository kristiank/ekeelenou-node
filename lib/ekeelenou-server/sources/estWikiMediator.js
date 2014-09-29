var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var q = require("q");
var MediaWikiAPI = require('./APIs/MediaWikiAPI');
var controller = require('./processors/wikiProc');

/**
 * E-keelenõu ressurss, mis võimaldab teha päringuid:
 * Eesti Vikipeedias.
 * Juhul kui täpse nimega artiklit ei leitud, tehakse avatud päring.
 * 
 * @class estWikiMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator
 */

// mediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var mediator = new AbstractMediatorTemplate();

mediator['id'] = 'WikiEst';
mediator['abbr'] = 'Vikipeedia';
mediator['name'] = 'Eesti Vikipeedia';
mediator['API'] = new MediaWikiAPI('https://et.wikipedia.org/w/api.php');
mediator['processors'].push(controller);

module.exports = mediator;
