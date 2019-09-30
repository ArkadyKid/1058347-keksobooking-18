'use strict';

(function () {

  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main');
  var popups = document.querySelectorAll('.popup');
  var popupCloseElements = document.querySelectorAll('.popup__close');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      for (var i = 0; i < pins.length; i++) {
        addCloseAttribute(i)
      }
    }
  };

  var addCloseAttribute = function (element) {
    popups[element].style.display = 'none';
  };

  var iteratePopups = function (element) {
    for (var i = 0; i < pins.length; i++) {
      addCloseAttribute(i);
      pins[i].classList.remove('map__pin--active');
    }
    popups[element].style.display = null;
    pins[element].classList.add('map__pin--active');
  };

  var showCard = function (element) {
    pins[element].addEventListener('click', function () {
      iteratePopups(element);
    });

    pins[element].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEY_CODE) {
        iteratePopups(element);
      }
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeCard = function (element) {
    popupCloseElements[element].addEventListener('click', function () {
      for (var i = 0; i < pins.length; i++) {
        addCloseAttribute(i);
      }
      document.removeEventListener('keydown', onPopupEscPress);
    });
  };

  for (var i = 0; i < pins.length; i++) {
    showCard(i);
    closeCard(i);
  }
})();
