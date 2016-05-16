var App = (function(document, window) {

  function bootstrap() {
    document.addEventListener('readystatechange', function() {
      if (document.readyState !== 'complete') {
        return;
      }
      Router.goTo(window.location.hash);
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
