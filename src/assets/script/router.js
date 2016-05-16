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
    '#detail': 'assets/template/detail.html'
  };

  function goTo(hash) {

    if (hash.indexOf('/') > -1) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 400) {
            View.renderDetail(xhr.response);
          } else {
            console.log(xhr.response);
          }
        }
      };

      xhr.open('GET', templateMap['#detail'], true);
      xhr.send();
    } else {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 400) {
            View.renderTemplate(xhr.response);
            if (Data.db[hash]) {
              View.renderList(Data.db[hash]);
            } else {
              var model = new Model(hash);
              model.get(function(data) {
                Data.db[hash] = data.results;
                View.renderList(data.results);
              });
            }
          } else {
            console.log(xhr.response);
          }
        }
      };

      xhr.open('GET', templateMap[hash], true);
      xhr.send();
    }



  }

  function goToDetail(url) {

  }

  function extractProperHash(url) {
    return '#' + url.split('/api/')[1];
  }

  return {
    goTo: goTo,
    extractProperHash: extractProperHash
  };

}());
