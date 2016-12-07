'use strict';
/* global instantsearch */

var getTemplateByID = function(ID){
  return document.getElementById(ID).innerHTML.toString();
}

var highlightShortValue = function(hightlightResult, letter_padding){
    var letterPadding = letter_padding | 50,
    stringValue = hightlightResult,
    startIndex, endIndex, startString, endString;

  startIndex = Math.max( stringValue.indexOf('<em>') - letterPadding, 0 );
  endIndex = Math.min( stringValue.lastIndexOf('</em>') + letterPadding, stringValue.length );

  startString =  ( startIndex > 0 ) ? '... ' : '';
  endString = ( endString !== stringValue.length ) ? ' ...' : '';

  return startString + stringValue.substring(startIndex, endIndex) + endString;

}

var search = instantsearch({
  appId: 'YORNOA2EPS',
  apiKey: '6f2b9a275341d6961c799a2981b9d663',
  indexName: 'coaching_content',
  searchParameters: {
    //getRankingInfo:audience true,
    // aroundLatLngViaIP: true
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
    placeholder: 'Find out more'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

search.on('render', function() {
  // console.log(data);
});

var hitTemplate =
  '<article class="hit">' +
    '<div class="content-desc">' +
      '<div class="content-title"><a href="{{URL}}" target="_blank">{{{_highlightResult.title.value}}}</a></div>' +
      '<div class="content-date">{{{date}}}</div>' +
      '<div class="content-description">{{{_highlightResult.description.value}}}</div>' +
    '</div>' +
      /*'<div class="content-descrption">{{#stars}}<span class="ais-star-rating--star{{^.}}__empty{{/.}}"></span>{{/stars}}</div>' +*/
  '</article>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

var menuTemplate =
  '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> {{name}}</span class="facet-name"></a>';

var facetTemplateCheckbox =
  '<a href="javascript:void(0);" class="facet-item">' +
    '<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{name}}" {{#isRefined}}checked{{/isRefined}} />{{name}}' +
    '<span class="facet-count">({{count}})</span>' +
  '</a>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 15,
    highlightPreTag: "<em>",
    highlightPostTag: "</em>",    
    templates: {
      empty: noResultsTemplate,
      item: getTemplateByID('template-hit-coach')
    },
    transformData: function(hit) {
      console.log(hit);
      if(hit._highlightResult.description.matchedWords.length > 0){
        hit.description_short = highlightShortValue(hit._highlightResult.description.value)
      }else{
        hit.description_short = hit.description.substr(0, 165) + '...';
      }      
      return hit;
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      active: 'active'
    },
    labels: {
      previous: '<i class="fa fa-angle-left fa-2x"></i> Previous page',
      next: 'Next page <i class="fa fa-angle-right fa-2x"></i>'
    },
    showFirstLast: false
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#media_type',
    attributeName: 'media_type',
    limit: 100,
    cssClasses: {
      root: 'checkbox',
      list: 'list-group', 
      item: 'list-group-item' 
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#audience',
    attributeName: 'audience',
    limit: 100,
    cssClasses: {
      root: 'checkbox',
      list: 'list-group', 
      item: 'list-group-item' 
    }
  })
);


search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#media_type',
    attributeName: 'media_type',
    limit: 100,
    cssClasses: {
      root: 'checkbox',
      list: 'list-group', 
      item: 'list-group-item' 
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#languages',
    attributeName: 'languages',
    limit: 100,
    cssClasses: {
      root: 'checkbox',
      list: 'list-group', 
      item: 'list-group-item' 
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#source',
    attributeName: 'source',
    limit: 100,
    cssClasses: {
      root: 'checkbox',
      list: 'list-group', 
      item: 'list-group-item' 
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#product',
    attributeName: 'product',
    limit: 100,
    cssClasses: {
      root: 'checkbox',
      list: 'list-group', 
      item: 'list-group-item' 
    }
  })
);

search.addWidget(
  instantsearch.widgets.sortBySelector({
    container: '#sort-by-selector',
    indices: [
      {name: 'coaching_content', label: 'Default'},
      {name: 'coaching_content_date', label: 'Newest'}
    ],
    label:'sort by'
  })
);


search.addWidget(
  instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: '<i class="fa fa-eraser"></i> Clear all filters'
    },
    cssClasses: {
      root: 'btn btn-block btn-default'
    },
    autoHideContainer: true
  })
);

search.addWidget(
  instantsearch.widgets.currentRefinedValues({
    container: '#current-filters',
    clearAll: 'after',
    templates: {
      item: function(data){
        console.log(data);
        var s = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' +
        data.name + ' <span class="ais-current-refined-values--count"> (' + data.count + ')</span>'
        return s;
      }
    },
    attributes: [
      { name: 'chris' }
    ],
    cssClasses: {
      link: 'label label-default'
    }
  })
);

search.start();
