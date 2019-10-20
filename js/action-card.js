'use strict';

(function () {

  var removeOnEscPress = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addOnEscPress = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    var pinElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    if (evt.keyCode === window.util.KEY_CODE.ESC) {
      for (var i = 0; i < pinElement.length; i++) {
        addCloseAttribute(i);
      }
    }
    removeOnEscPress();
  };

  var addCloseAttribute = function (element) {
    var popupElement = document.querySelectorAll('.popup');
    popupElement[element].style.display = 'none';
  };

  var iteratePopups = function (element, pinElement, popupElement) {
    for (var i = 0; i < pinElement.length; i++) {
      addCloseAttribute(i);
      pinElement[i].classList.remove('map__pin--active');
    }
    popupElement[element].style.display = null;
    pinElement[element].classList.add('map__pin--active');
  };

  var showCard = function (element) {
    var pinElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    var popupElement = document.querySelectorAll('.popup');
    pinElement[element].addEventListener('click', function () {
      iteratePopups(element, pinElement, popupElement);
      addOnEscPress();
    });
    pinElement[element].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEY_CODE.ENTER) {
        iteratePopups(element, pinElement, popupElement);
        addOnEscPress();
      }
    });
  };

  var closeCard = function (element) {
    var pinElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    var popupCloseElement = document.querySelectorAll('.popup__close');
    popupCloseElement[element].addEventListener('click', function () {
      for (var i = 0; i < pinElement.length; i++) {
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
