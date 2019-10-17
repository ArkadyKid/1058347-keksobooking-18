'use strict';

(function () {

  var ENTER_KEY = window.util.KEY_CODE.ENTER;
  var SIZE_PIN = {
    HALF_WIDTH: window.util.SIZE_PIN.HALF_WIDTH,
    HEIGHT: window.util.SIZE_PIN.HEIGHT
  };
  var MAX_COUNT = 5;

  var pins = [];
  var load = window.backend.load;
  var errorHandler = window.backend.errorHandler;
  var renderCards = window.rendercards.renderCards;
  var setActiveWindow = window.form.setActiveWindow;
  var mapPinMainElement = window.util.mapPinMainElement;

  var cardFragment = document.createDocumentFragment();
  var pinFragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
  var mapFiltersElement = window.util.mapElement.querySelector('.map__filters-container');

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

  var successHandler = function (data) {
    pins = data;
    var pinsCount = pins.length > MAX_COUNT ? MAX_COUNT : pins.length;
    for (var j = 0; j < pinsCount; j++) {
      cardFragment.appendChild(renderCards(data[j]));
    }

    for (var i = 0; i < pinsCount; i++) {
      pinFragment.appendChild(renderPins(data[i]));
    }

    window.util.mapElement.insertBefore(cardFragment, mapFiltersElement);
    mapPinsElement.appendChild(pinFragment);

    for (var k = 0; k < pinsCount; k++) {
      window.actionCard.show(k);
      window.actionCard.close(k);
    }

    mapPinMainElement.addEventListener('mousedown', function () {
      setActiveWindow();
    });

    mapPinMainElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY) {
        setActiveWindow();
      }
    });
  };

  load(successHandler, errorHandler);

  var housingTypeElement = document.querySelector('#housing-type');

  housingTypeElement.addEventListener('change', function () {
    if (housingTypeElement.value === 'bungalo') {
      pins = pins.filter(function (pin) {
        return pin.offer.type === 'Бунгало';
      });
      var pinsCount = pins.length > MAX_COUNT ? MAX_COUNT : pins.length;

      for (var i = 0; i < pinsCount; i++) {
        pinFragment.appendChild(renderPins(pins[i]));
      }

      for (var j = 0; j < pinsCount; j++) {
        cardFragment.appendChild(renderCards(pins[j]));
      }

      if (mapPinsElement.childElementCount > 2) {
        while (mapPinsElement.childElementCount > 2) {
          mapPinsElement.removeChild(mapPinsElement.lastChild);
        }
      }

      if (window.util.mapElement.childElementCount > 1) {
        var popupElement = window.util.mapElement.querySelectorAll('.popup');
          for (var m = 0; m < popupElement.length; m++) {
            window.util.mapElement.removeChild(popupElement[m]);
          }
      }

      mapPinsElement.appendChild(pinFragment);
      window.util.mapElement.insertBefore(cardFragment, mapFiltersElement);

      var pinsElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
      for (var k = 0; k < pins.length; k++) {
        pinsElement[k].style.display = null;
      }
      for (var l = 0; l < pinsElement.length; l++) {
        window.actionCard.show(l);
        window.actionCard.close(l);
      }
    }
  });

})();
