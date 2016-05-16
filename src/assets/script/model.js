var Model = (function(window) {

  var base = 'http://swapi.co/api/';

  function ModelClass(resource) {
    if (resource.indexOf('#') === 0) {
      this.resource = resource.replace('#', '');
    } else {
      this.resource = 'films';
    }
  }

  ModelClass.prototype.get = function(success, error) {
    success = success || function() {};
    error = error || function() {};

    Request.abstract('GET', base + this.resource, function(response) {
      Data.currentItem = JSON.parse(response);
      success(Data.currentItem);
    }, function(response) {
      error(JSON.parse(response));
    });
  };

  return ModelClass;

}(window));
