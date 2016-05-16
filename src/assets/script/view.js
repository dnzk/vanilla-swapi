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

      window.onscroll = function() {
        var bottom = window.scrollY + window.innerHeight === document.body.clientHeight;
        if (bottom) {
          if (Data.currentItem.next) {
            var resource = Data.currentItem.next.split('/api/')[1];
          }
          var model = new Model('#' + resource);
          model.get(function(response) {
            renderList(response.results);
          });
        }
      };
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
    var clone = document.importNode(detailContainer, true);
    var backdrop = document.querySelector('.backdrop');
    backdrop.appendChild(clone);
    // backdrop.onclick = function() {
    //   // go out of detail
    //   window.location.hash = '#people';

    //   // remove detail view
    //   var detailContainer = document.querySelector('.detail-grand-container');
    //   while (detailContainer.firstChild) {
    //     detailContainer.removeChild(detailContainer.firstChild);
    //   }
    // };
    backdrop.onclick = clearBackdrop;

    // document.querySelector('.backdrop').appendChild(clone);

    var model = new Model(window.location.hash);
    model.get(function(data) {
      bindDetail(data);
    });
  }

  function clearBackdrop() {
    // go out of detail
    window.location.hash = window.location.hash.split('/')[0];

    // remove detail view
    var detailContainer = document.querySelector('.detail-grand-container');
    while (detailContainer.firstChild) {
      detailContainer.removeChild(detailContainer.firstChild);
    }
  }

  function bindDetail(item) {
    var detailContainer = document.querySelector('.detail-container');
    var string = '';

    while (detailContainer.firstChild) {
      detailContainer.removeChild(detailContainer.firstChild);
    }

    for (var property in item) {
      if (item.hasOwnProperty(property)) {
        var p = document.createElement('p');
        string = property + ': ' + item[property];
        p.innerText = string;
        detailContainer.appendChild(p);
      }
    }
  }

  return {
    renderTemplate: renderTemplate,
    renderList: renderList,
    renderDetail: renderDetail,
    getTemplate: getTemplate,
  };

}(document));
