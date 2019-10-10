'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';
  var SUCCESS_STATUS = 200;
  var INVALID_URL_STATUS = 500;
  var TIMEOUT = 10000;

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessageElement = errorElement.querySelector('.error__message');
    var errorButtonElement = errorElement.querySelector('.error__button');

    var hideErrorBlock = function () {
      document.body.removeChild(errorElement);
    };

    var onClickErrorButton = function (evt) {
      evt.preventDefault();
      hideErrorBlock();
      errorButtonElement.removeEventListener('click', onClickErrorButton);
    };

    var onEscPress = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.util.ESC_KEY_CODE) {
        hideErrorBlock();
      }
      errorButtonElement.removeEventListener('keydown', onEscPress);
    };

    errorMessageElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
    errorButtonElement.addEventListener('click', onClickErrorButton);
    document.addEventListener('keydown', onEscPress);
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

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

    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load,
    errorHandler: errorHandler
  };
})();
