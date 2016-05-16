var Model = (function(window) {

  var base = 'http://swapi.co/api/';

  // function request(type, resource, success, error) {
  //   var xhr = new XMLHttpRequest();

  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status >= 200 && xhr.status < 400) {
  //         success(JSON.parse(xhr.response));
  //       } else {
  //         error(JSON.parse(xhr.response));
  //       }
  //     }
  //   };

  //   xhr.open(type, base + resource, true);
  //   xhr.send();
  // }

  function ModelClass(resource) {
    if (resource.indexOf('#') === 0) {
      this.resource = resource.replace('#', '');
    } else {
      this.resource = 'films';
    }
  }

  ModelClass.prototype.get = function(success, error) {
    // request('GET', this.resource, success, error);
    success = success || function() {};
    error = error || function() {};

    Request.abstract('GET', base + this.resource, function(response) {
      success(JSON.parse(response));
    }, function(response) {
      error(JSON.parse(response));
    });
  };

  return ModelClass;

}(window));
