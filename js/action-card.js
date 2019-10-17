'use strict';

(function () {

  var removeOnEscPress = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addOnEscPress = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    var pinsElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    if (evt.keyCode === window.util.KEY_CODE.ESC) {
      for (var i = 0; i < pinsElement.length; i++) {
        addCloseAttribute(i);
      }
    }
    removeOnEscPress();
  };

  var addCloseAttribute = function (element) {
    var popups = document.querySelectorAll('.popup');
    popups[element].style.display = 'none';
  };

  var iteratePopups = function (element) {
    var pinsElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    var popups = document.querySelectorAll('.popup');
    for (var i = 0; i < pinsElement.length; i++) {
      addCloseAttribute(i);
      pinsElement[i].classList.remove('map__pin--active');
    }
    popups[element].style.display = null;
    pinsElement[element].classList.add('map__pin--active');
  };

  var showCard = function (element) {
    var pinsElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    pinsElement[element].addEventListener('click', function () {
      iteratePopups(element);
      addOnEscPress();
    });
    pinsElement[element].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEY_CODE.ENTER) {
        iteratePopups(element);
        addOnEscPress();
      }
    });
  };

  var closeCard = function (element) {
    var pinsElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    var popupCloseElements = document.querySelectorAll('.popup__close');
    popupCloseElements[element].addEventListener('click', function () {
      for (var i = 0; i < pinsElement.length; i++) {
        addCloseAttribute(i);
      }
      removeOnEscPress();
    });
  };

  window.actionCard = {
    show: showCard,
    close: closeCard
  };
})();
