var App = (function(document, window) {

  function bootstrap() {
    document.addEventListener('readystatechange', function() {
      if (document.readyState !== 'complete') {
        return;
      }
      Router.goTo(window.location.hash);

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
