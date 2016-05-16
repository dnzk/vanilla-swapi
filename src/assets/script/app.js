var Model = (function(window) {

  var base = 'http://swapi.co/api/';

  function request(type, resource, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          success(JSON.parse(xhr.response));
        } else {
          error(JSON.parse(xhr.response));
        }
      }
    };

    xhr.open(type, base + resource, true);
    xhr.send();
  }

  function ModelClass(resource) {
    this.resource = resource + '/';
  }

  ModelClass.prototype.get = function(success, error) {
    request('GET', this.resource, success, error);
  };

  return ModelClass;

}(window));

var App = (function(document, window) {

  function bootstrap() {
    document.addEventListener('readystatechange', function() {
      if (document.readyState !== 'complete') {
        return;
      }
      Router.goTo(window.location.hash);
      var people = new Model('people');
      people.get(success, error);

      function success(data) {
        // render
        var results = data.results;

        var feedListTemplate = document.querySelector('#template-feed-list');

        results.forEach(function(result) {
          var singleFeed = feedListTemplate.content.querySelector('.main-feed');
          singleFeed.querySelector('.name').innerHTML = result.name;
          var clone = document.importNode(singleFeed, true);
          document.querySelector('.feed-container').appendChild(clone);

        });

      }

      function error(data) {
        // handle error
        console.log(data);
      }

      function getTemplate(id) {
        return document.querySelector(id);
      }

      function mashDataWithTemplate(data, template) {
        // return 
      }

    });

    window.addEventListener('hashchange', function() {
      Router.goTo(window.location.hash);
    });
  }

  return {
    bootstrap: bootstrap
  };

}(document, window));

App.bootstrap();
