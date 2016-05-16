var Request = (function() {

  function abstract(type, url, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          success(xhr.response);
        } else {
          error(xhr.response);
        }
      }
    };

    xhr.open(type, url, true);
    xhr.send();
  }

  return {
    abstract: abstract
  };

}());
