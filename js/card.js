'use strict';

(function () {

  var load = window.backend.load;
  var errorHandler = window.backend.errorHandler;
  var renderCards = window.rendercards.renderCards;

  var cardFragment = document.createDocumentFragment();
  var pinFragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
  var mapFiltersElement = window.util.mapElement.querySelector('.map__filters-container');

  var renderPins = function (pin) {
    if (pin.offer) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImgElement = pinElement.querySelector('img');

      pinImgElement.src = pin.author.avatar;
      pinImgElement.alt = pin.offer.title;
      pinElement.style.left = pin.location.x - window.util.PIN_HALF_WIDTH + 'px';
      pinElement.style.top = pin.location.y - window.util.PIN_HEIGHT + 'px';
      pinElement.style.display = 'none';
      return pinElement;
    }
    return null;
  };

  var successHandler = function (pins) {
    for (var j = 0; j < pins.length; j++) {
      cardFragment.appendChild(renderCards(pins[j]));
    }

    for (var i = 0; i < pins.length; i++) {
      pinFragment.appendChild(renderPins(pins[i]));
    }

    window.util.mapElement.insertBefore(cardFragment, mapFiltersElement);
    mapPinsElement.appendChild(pinFragment);

    var pinsElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    var popups = document.querySelectorAll('.popup');
    var popupCloseElements = document.querySelectorAll('.popup__close');

    window.card = {
      pinsElement: pinsElement,
      popups: popups,
      popupCloseElements: popupCloseElements
    };

    for (var k = 0; k < pinsElement.length; k++) {
      window.actionCard.show(k);
      window.actionCard.close(k);
    }
  };

  load(successHandler, errorHandler);

})();
