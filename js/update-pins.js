'use strict';

(function () {
  var MAX_COUNT = 5;
  var SIZE_PIN = {
    HALF_WIDTH: window.util.SIZE_PIN.HALF_WIDTH,
    HEIGHT: window.util.SIZE_PIN.HEIGHT
  };

  var MIN_CHILD_OF = {
    MAP_PINS_ELEMENT: 2,
    MAP_ELEMENT: 1
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
  var mapFiltersElement = window.util.mapElement.querySelector('.map__filters-container');
  var renderCards = window.rendercards.renderCards;

  var renderPins = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImgElement = pinElement.querySelector('img');

    pinImgElement.src = pin.author.avatar;
    pinImgElement.alt = pin.offer.title;
    pinElement.style.left = pin.location.x - SIZE_PIN.HALF_WIDTH + 'px';
    pinElement.style.top = pin.location.y - SIZE_PIN.HEIGHT + 'px';
    pinElement.style.display = 'none';
    return pinElement;
  };

  var removePins = function () {
    if (mapPinsElement.childElementCount > MIN_CHILD_OF.MAP_PINS_ELEMENT) {
      while (mapPinsElement.childElementCount > MIN_CHILD_OF.MAP_PINS_ELEMENT) {
        mapPinsElement.removeChild(mapPinsElement.lastChild);
      }
    }
  };

  var removePopups = function () {
    var popupElement = window.util.mapElement.querySelectorAll('.popup');
    if (window.util.mapElement.childElementCount > MIN_CHILD_OF.MAP_ELEMENT) {
      for (var m = 0; m < popupElement.length; m++) {
        window.util.mapElement.removeChild(popupElement[m]);
      }
    }
  };

  var updatePins = function (pins) {
    var cardFragment = document.createDocumentFragment();
    var pinFragment = document.createDocumentFragment();
    var array = pins.slice();

    var pinsCount = array.length > MAX_COUNT ? MAX_COUNT : array.length;

    for (var i = 0; i < pinsCount; i++) {
      pinFragment.appendChild(renderPins(array[i]));
    }

    for (var j = 0; j < pinsCount; j++) {
      cardFragment.appendChild(renderCards(array[j]));
    }

    removePins();
    removePopups();
    window.util.mapElement.insertBefore(cardFragment, mapFiltersElement);
    mapPinsElement.appendChild(pinFragment);

    for (var l = 0; l < pinsCount; l++) {
      window.actionCard.show(l);
      window.actionCard.close(l);
    }
  };

  var showPinAfterFilter = function () {
    var pinElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var k = 0; k < pinElement.length; k++) {
      pinElement[k].style.display = null;
    }
  };

  window.updatePins = {
    updatePins: updatePins,
    showPinAfterFilter: showPinAfterFilter
  }
})();
