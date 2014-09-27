/**
 * Töötleb MediaWikiAPI-st saadud vastused ilusamaks
 * 
 * @class wikiProc
 * @static
 * @param {Object} data the message.data
 * @return {Object} data appropriate for the view
 */

function wikiProc(data) {
    // init the counter
    var word_cnt = 0;
    
    // base url for view more
    var baseUrl = 'https://et.wikipedia.org/wiki/';
    
    // holds one processed item
    var item = {};
    
    // holds all processed items
    var items = [];
        
    // find out what kind of action we ended up with
    if ('opensearch' in data) {
      data = data['opensearch'];
      for (var searchterm_i = 0; searchterm_i < data.length; searchterm_i += 2) {
        var searchterm = data[searchterm_i];
        var searchtermMatches = data[searchterm_i + 1];
        
        item['content'] = 'Leiti sarnaseid: ';
        item['content'] += searchtermMatches.join(', ');
        item['content'] += '.';
        items.push(item);
      }
    } else if ('query' in data) {
      // only the query part is needed
      data = data['query'];
      
      // add the found pages to the view's list
      for (var pageids_i=0; pageids_i<data['pageids'].length; pageids_i+=1) {
        var pageId = data['pageids'][pageids_i];
        var page = data['pages'][pageId];
        
        word_cnt += 1;
        item = {};
        
        // if the article redirects, it should be reflected in the title
        if ('redirects' in data) {
          // we should only get length 1, but anyways we can loop it
          //for (redirects_i=0; redirects_i<data['redirects'].length; redirects_i+=1) {
            item['title'] = data['redirects'][0]['from'] + " → " + page['title'];
            item['url'] = baseUrl + data['redirects'][0]['to'];
          //}
        } else {
          item['title'] = page['title'];
          item['url'] = baseUrl + page['title'];
        }
        
        // add the extracted content
        item['content'] = page['extract'];
        // remove <hr> and trim whitespace
        item['content'] = item['content'].replace(/<hr[ ]?[/]?>/gi, '');
        item['content'] = item['content'].trim();
        
        // add the associated categories (but not blaclisted)
        item['categories'] = [];
        /*if ('categories' in page) {
          var categories_i;
          var categoriesLength = page['categories'].length;
          var category;
          for (categories_i = 0; categories_i < categoriesLength; categories_i += 1) {
            category = page['categories'][categories_i];
            item['categories'].push(stripNamespace(category['title']));
          }
        }*/
        
        items.push(item);
      }
    }
    return items;
}

module.exports = wikiProc;