/**
 * View for the Estonian Wikipedia
 * 
 * @class RGWikiEst
 * @uses RGView
 * @param id
 */
var RGWikiEst = function(id) {
  RGView.apply(this, arguments);
  var self = this;

  self.word_cnt = 0;
  
  /**
   * Processes the data coming from the Wikipedia API
   * and pushes processed items to rslt list
   * 
   * @method procResponse
   * @param sid
   * @param data
   */
  self.procResponse = function(sid, data) {
    // init the counter
    self.word_cnt = 0;
    
    // base url for view more
    var baseUrl = 'https://et.wikipedia.org/wiki/';
    
    // find out what kind of action we ended up with
    if ('opensearch' in data) {
      data = data['opensearch'];
      for (searchterm_i = 0; searchterm_i < data.length; searchterm_i += 2) {
        var item = {};
        var searchterm = data[searchterm_i];
        var searchtermMatches = data[searchterm_i + 1];
        
        item['content'] = 'Leiti sarnaseid: ';
        item['content'] += searchtermMatches.join(', ');
        item['content'] += '.';
        self.rslts.push(item);
      }
    } else if ('query' in data) {
      // only the query part is needed
      data = data['query'];
      
      // add the found pages to the view's list
      for (pageids_i=0; pageids_i<data['pageids'].length; pageids_i+=1) {
        var pageId = data['pageids'][pageids_i];
        var page = data['pages'][pageId];
        
        self.word_cnt += 1;
        var item = {};
        
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
        if ('categories' in page) {
          var categories_i;
          var categoriesLength = page['categories'].length;
          var category;
          for (categories_i = 0; categories_i < categoriesLength; categories_i += 1) {
            category = page['categories'][categories_i];
            item['categories'].push(stripNamespace(category['title']));
          }
        }
        
        self.rslts.push(item);
      }
    }
  };
  
  /**
   * Returns the number of results
   * 
   * @method reslen
   * @return {Number}
   */
  self.reslen = ko.computed(function () {
    if (self.items().length) {
      return self.word_cnt;
    } else {
      return 0;
    }
  });
  
  /**
   * Simple blacklist of wiki categories
   * 
   * @method categoryInBlacklist
   * @param {String} category name
   * @param {Boolean} [stripNamespace] default false
   * @return {Boolean}
   */
  function categoryInBlacklist(catName, stripNamespace) {
    var blacklist = [
      '',
      ];
    
    if (typeof stripNamespace === 'undefined') {
      stripNamespace = false;
    }
    if (stripNamespace) {
      catName = stripNamespace(catName);
    }
    
    return (blacklist.indexOf(catName) === -1 ? false : true);;
  }
  
  /**
   * Strips the namespace from the beginning of a wiki category name.
   * Actually deletes everything until the first ':'.
   * 
   * @method stripNamespace
   * @param {String} catName
   * @return {String}
   */
   function stripNamespace(catName) {
     var index = catName.indexOf(':');
     
     if (index > -1) {
       return catName.slice(index + 1);
     } else {
       return catName;
     }
   }
  
  /**
   * Generates a HTML serialisation of the items in the rslt array
   * 
   * @method showItems
   */
  self.showItems = function() {
    
    var itemList = [];
    for (var rslts_i = 0; rslts_i < self.rslts.length; rslts_i+=1) {
      var item = self.rslts[rslts_i];
      var html = '';
      
      // title section
      if (typeof item['title'] !== 'undefined') {
        html += "<p><u>" + item['title'] + "</u></p>";
      }
      // content section
      item['content'] = item['content'].replace(/(\n)/g, '<br>');
      html += "<p>" + item['content'] + "</p>";
      // categories section REMOVED
      /*if (item['categories'].length) {
      //	html += "<p><i>Esineb kategooriates " + item['categories'].join(', ') + ".</i></p>";
      }*/
      // create read more section
      html += '<i>Loe rohkem Vikipeedias</i>';
      var vi = new Result('', html);
      //var vi = new ExpandableDataItem('', '', '', '', self.rslts[i]);
      itemList.push( vi );
    }
    self.items(itemList); //näitame uut arrayd
  };
};
