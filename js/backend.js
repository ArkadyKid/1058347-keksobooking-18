'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_STATUS = 200;
  var INVALID_URL_STATUS = 500;
  var TIMEOUT = 10000;

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessageElement = errorElement.querySelector('.error__message');

    document.body.appendChild(errorElement);

    var hideErrorBlock = function () {
      document.body.removeChild(errorElement);
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEY_CODE) {
        evt.preventDefault();
        hideErrorBlock();
      }
      document.removeEventListener('keydown', onEscPress);
    };

    var onClickErrorBlock = function (evt) {
      evt.preventDefault();
      hideErrorBlock();
      errorElement.removeEventListener('click', onClickErrorBlock);
      document.removeEventListener('keydown', onEscPress);
    };

    errorMessageElement.textContent = errorMessage;

    document.addEventListener('keydown', onEscPress);
    errorElement.addEventListener('click', onClickErrorBlock);
  };

  var setBehaviourResponse = function (xhr, onSuccess, onError) {
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
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'ms');
    });
    xhr.timeout = TIMEOUT;
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setBehaviourResponse(xhr, onSuccess, onError);
    xhr.responseType = 'json';
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setBehaviourResponse(xhr, onSuccess, onError);
    xhr.responseType = 'json';
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload,
    errorHandler: errorHandler
  };
})();
