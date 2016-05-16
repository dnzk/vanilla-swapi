var View = (function(document) {

  function getTemplate(url, success, error) {
    success = success || renderTemplate;

    Request.abstract('GET', url, success);
  }

  function render(templateString, containerClass) {
    var template = document.createElement('div');
    template.innerHTML = templateString;
    var container = document.querySelector(containerClass);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(template);
  }

  function renderTemplate(templateString) {
    render(templateString, '.feed-grand-container');

    // ad hoc presenter
    if (window.location.hash && window.location.hash !== '#home') {
      var model = new Model(window.location.hash);
      model.get(function(response) {
        renderList(response.results);
      });
    }
  }

  function renderList(list) {

    var feedListTemplate = document.querySelector('#template-feed-list');

    list.forEach(function(data, index) {
      var singleFeed = feedListTemplate.content.querySelector('.main-feed');
      singleFeed.querySelector('.name').innerHTML = data.name || data.title;
      var clone = document.importNode(singleFeed, true);


      clone.__swapi_url__ = Router.extractProperHash(data.url);

      clone.onclick = function(event) {
        event.preventDefault();
        window.location.hash = this.__swapi_url__;
      };

      document.querySelector('.feed-container').appendChild(clone);
    });
  }

  function renderDetail(templateString) {
    render(templateString, '.detail-grand-container');

    var detailTemplate = document.querySelector('#template-detail');
    var detailContainer = detailTemplate.content.querySelector('.detail-container');
    // // detailContainer.querySelector()
    var clone = document.importNode(detailContainer, true);
    document.querySelector('.backdrop').appendChild(clone);

    var model = new Model(window.location.hash);
    model.get(function(data) {
      console.log(data);
    })
    // // var detailContainer = document.querySelector('.detail-container');
    // // var string = '';

    // // while (detailContainer.firstChild) {
    // //   detailContainer.removeChild(detailContainer.firstChild);
    // // }

    // // for (var property in item) {
    // //   if (item.hasOwnProperty(property)) {
    // //     var p = document.createElement('p');
    // //     string = property  + ': ' + item[property];
    // //     p.innerText = string;
    // //     detailContainer.appendChild(p);
    // //   }
    // // }

    // // document.querySelector('.detail-container').innerHTML = JSON.stringify(item);
  }

  return {
    renderTemplate: renderTemplate,
    renderList: renderList,
    renderDetail: renderDetail,
    getTemplate: getTemplate,
  };

}(document));
