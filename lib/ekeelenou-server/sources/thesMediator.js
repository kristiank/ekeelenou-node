var AbstractMediatorTemplate = require("./AbstractMediatorTemplate");
var WordNetAPI = require('./APIs/WordNetAPI');

/**
 * E-keelenõu ressurss, mis võimaldab teha * päringuid Eesti Vikipeedias.
 * Juhul kui täpse nimega artiklit ei leitud, tehakse avatud päring.
 * 
 * @class estWikiMediator
 * @extends AbstractMediatorTemplate
 * @uses MediaWikiAPI
 * @return {sourceMediator} sourceMediator for the Estonian Wikipedia
 */

// estWikiMediator on šabloon ja pärib prototüübi AbstractMediatorTemplate'ilt
var thesMediator = new AbstractMediatorTemplate();

thesMediator['id'] = 'thes';
thesMediator['abbr'] = 'EWN';
thesMediator['name'] = 'Eesti Wordnet';
thesMediator['API'] = new WordNetAPI('thes');
// estWikiMediator['processors'].push(controller);

module.exports = thesMediator;
