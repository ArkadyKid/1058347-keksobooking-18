'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var SUCCESS_STATUS = 200;
  var INVALID_URL_STATUS = 500;
  var TIMEOUT = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var checkError = function () {
      switch (xhr.status) {
        case SUCCESS_STATUS:
          onSuccess(xhr.response);
          break;
        case INVALID_URL_STATUS:
          onError('Неправильный URL');
          break;
        default:
          onError('Произошла ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', checkError);
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'ms')
    });
    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  }
})();
