'use strict';

(function () {

  var removeOnEscPress = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addOnEscPress = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main');
    if (evt.keyCode === window.util.KeyCode.ESC) {
      for (var i = 0; i < pinList.length; i++) {
        addCloseAttribute(i);
      }
    }
    removeOnEscPress();
  };

  var addCloseAttribute = function (element) {
    var popupList = document.querySelectorAll('.popup');
    popupList[element].style.display = 'none';
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
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main');
    var popupList = document.querySelectorAll('.popup');
    pinList[element].addEventListener('click', function () {
      iteratePopups(element, pinList, popupList);
      addOnEscPress();
    });
    pinList[element].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KeyCode.ENTER) {
        iteratePopups(element, pinList, popupList);
        addOnEscPress();
      }
    });
  };

  var closeCard = function (element) {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main');
    var popupCloseList = document.querySelectorAll('.popup__close');
    popupCloseList[element].addEventListener('click', function () {
      for (var i = 0; i < pinList.length; i++) {
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
