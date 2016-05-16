var View = (function(document) {

  function renderTemplate(templateString) {
    var template = document.createElement('div');
    template.innerHTML = templateString;
    var grandContainer = document.querySelector('.feed-grand-container');
    while (grandContainer.firstChild) {
      grandContainer.removeChild(grandContainer.firstChild);
    }
    grandContainer.appendChild(template);
  }

  return {
    renderTemplate: renderTemplate
  };

}(document));

var Router = (function() {

  var templateMap = {
    '': 'assets/template/home.html',
    '#home': 'assets/template/home.html',
    '#people': 'assets/template/people.html',
    '#films': 'assets/template/films.html',
    '#starships': 'assets/template/starships.html',
    '#vehicles': 'assets/template/vehicles.html',
    '#species': 'assets/template/species.html',
    '#planets': 'assets/template/planets.html'
  };

  function goTo(hash) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          View.renderTemplate(xhr.response);
        } else {
          console.log(xhr.response);
        }
      }
    };

    xhr.open('GET', templateMap[hash], true);
    xhr.send();

  }

  return {
    goTo: goTo
  };

}());
