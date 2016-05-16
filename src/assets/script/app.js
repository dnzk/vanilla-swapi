var App = (function(document, window) {

  function bootstrap() {
    document.addEventListener('readystatechange', function() {
      if (document.readyState !== 'complete') {
        return;
      }
      Router.goTo(window.location.hash);
      var people = new Model('people');
      // people.get(success, error);

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
