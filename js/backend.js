'use strict';

(function () {

  var ESC_KEY = window.util.KeyCode.ESC;
  var TIMEOUT = 10000;

  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var Status = {
    SUCCESS: 200,
    SERVER_ERROR: 500
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessageElement = errorElement.querySelector('.error__message');

    document.body.appendChild(errorElement);

    var hideErrorBlock = function () {
      document.body.removeChild(errorElement);
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEY) {
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
        case Status.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Status.SERVER_ERROR:
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
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setBehaviourResponse(xhr, onSuccess, onError);
    xhr.responseType = 'json';
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload,
    errorHandler: errorHandler
  };
})();
