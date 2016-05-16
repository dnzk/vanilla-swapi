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

  function renderList(list) {

    var feedListTemplate = document.querySelector('#template-feed-list');

    list.forEach(function(data) {
      var singleFeed = feedListTemplate.content.querySelector('.main-feed');
      singleFeed.querySelector('.name').innerHTML = data.name;
      var clone = document.importNode(singleFeed, true);

      clone.__swapi_data__ = data;

      clone.onclick = function(event) {
        event.preventDefault();
        // manage detail data here
        console.log(this.__swapi_data__);
      }

      document.querySelector('.feed-container').appendChild(clone);
    });
  }

  return {
    renderTemplate: renderTemplate,
    renderList: renderList,
  };

}(document));
