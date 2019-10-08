'use strict';

(function () {
  var pinsElement = window.form.pinsElement;
  var popups = document.querySelectorAll('.popup');
  var popupCloseElements = document.querySelectorAll('.popup__close');

  var removeOnEscPress = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addOnEscPress = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      for (var i = 0; i < pinsElement.length; i++) {
        addCloseAttribute(i);
      }
    }
    removeOnEscPress();
  };

  var addCloseAttribute = function (element) {
    popups[element].style.display = 'none';
  };

  var iteratePopups = function (element) {
    for (var i = 0; i < pinsElement.length; i++) {
      addCloseAttribute(i);
      pinsElement[i].classList.remove('map__pin--active');
    }
    popups[element].style.display = null;
    pinsElement[element].classList.add('map__pin--active');
  };

  var showCard = function (element) {
    pinsElement[element].addEventListener('click', function () {
      iteratePopups(element);
      addOnEscPress();
    });
    pinsElement[element].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEY_CODE) {
        iteratePopups(element);
        addOnEscPress();
      }
    });
  };

  var closeCard = function (element) {
    popupCloseElements[element].addEventListener('click', function () {
      for (var i = 0; i < pinsElement.length; i++) {
        addCloseAttribute(i);
      }
      removeOnEscPress();
    });
  };

  for (var i = 0; i < pinsElement.length; i++) {
    showCard(i);
    closeCard(i);
  }
})();
