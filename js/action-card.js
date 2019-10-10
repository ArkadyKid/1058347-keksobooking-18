'use strict';

(function () {

  var removeOnEscPress = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addOnEscPress = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      for (var i = 0; i < window.card.pinsElement.length; i++) {
        addCloseAttribute(i);
      }
    }
    removeOnEscPress();
  };

  var addCloseAttribute = function (element) {
    window.card.popups[element].style.display = 'none';
  };

  var iteratePopups = function (element) {
    for (var i = 0; i < window.card.pinsElement.length; i++) {
      addCloseAttribute(i);
      window.card.pinsElement[i].classList.remove('map__pin--active');
    }
    window.card.popups[element].style.display = null;
    window.card.pinsElement[element].classList.add('map__pin--active');
  };

  var showCard = function (element) {
    window.card.pinsElement[element].addEventListener('click', function () {
      iteratePopups(element);
      addOnEscPress();
    });
    window.card.pinsElement[element].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEY_CODE) {
        iteratePopups(element);
        addOnEscPress();
      }
    });
  };

  var closeCard = function (element) {
    window.card.popupCloseElements[element].addEventListener('click', function () {
      for (var i = 0; i < window.card.pinsElement.length; i++) {
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
