var Router = (function() {

  function goTo(hash) {
    console.log(hash);
  }

  return {
    goTo: goTo
  };

}());

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

        var feeds = document.querySelectorAll('.main-feed');
        // feeds = [].slice.call(feeds).map(function(feed, i) {
        //   var name = feed.querySelector('.name')[0];
        //   name.innerHTML = data[i].name;
        //   feed.query
        //   return feed;
        // });

        [].slice.call(feeds).forEach(function(feed, i) {
          feed.querySelector('.name').innerHTML = results[i].name;
        });

        // console.log(feeds);
      }

      function error(data) {
        // render
        console.log(data);
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
