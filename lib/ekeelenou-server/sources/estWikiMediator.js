var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var q = require("q");
var MediaWikiAPI = require('./APIs/MediaWikiAPI');
var controller = require('./processors/Wiki');

/**
 * E-keelenõu ressurss, mis võimaldab teha * päringuid Eesti Vikipeedias.
 * Juhul kui täpse nimega artiklit ei leitud, tehakse avatud päring.
 * 
 * @class estWikiMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator for the Estonian Wikipedia
 */

// las estWikiMediator pärib prototüübi AbstractMediatorTemplate'ilt
var estWikiMediator = new AbstractMediatorTemplate();

estWikiMediator['id'] = 'WikiEst';
estWikiMediator['abbr'] = 'Vikipeedia';
estWikiMediator['name'] = 'Eesti Vikipeedia';
estWikiMediator['API'] = new MediaWikiAPI('https://et.wikipedia.org/w/api.php');

module.exports = estWikiMediator;
