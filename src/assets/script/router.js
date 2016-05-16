var Router = (function() {

  var templateMap = {
    '': 'assets/template/home.html',
    '#home': 'assets/template/home.html',
    '#people': 'assets/template/people.html',
    '#films': 'assets/template/films.html',
    '#starships': 'assets/template/starships.html',
    '#vehicles': 'assets/template/vehicles.html',
    '#species': 'assets/template/species.html',
    '#planets': 'assets/template/planets.html',
    '#detail': 'assets/template/detail.html',
  };

  function goTo(hash) {
    if (templateMap[hash]) {
      View.getTemplate(templateMap[hash]);
    } else {
      if (hash.indexOf('/') > -1) {
        View.getTemplate(templateMap['#detail'], function(template) {
          View.renderDetail(template);
        });
      } else {
        throw new Error('unable to render view');
      }
    }
  }

  function extractProperHash(url) {
    return '#' + url.split('/api/')[1];
  }

  return {
    goTo: goTo,
    extractProperHash: extractProperHash
  };

}());
