'use strict';

(function () {

  var ENTER_KEY = window.util.KEY_CODE.ENTER;

  var SIZE_PIN = {
    HALF_WIDTH: window.util.SIZE_PIN.HALF_WIDTH,
    HEIGHT: window.util.SIZE_PIN.HEIGHT
  };

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


  var housingTypeElement = document.querySelector('#housing-type');

  housingTypeElement.addEventListener('change', function () {
    if (housingTypeElement.value === 'bungalo') {
      pins = pins.filter(function (pin) {
        return pin.offer.type === 'Бунгало';
      })
    }
    return pins;
  });

  var renderPins = function (pin) {
    if (pin.offer) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImgElement = pinElement.querySelector('img');

      pinImgElement.src = pin.author.avatar;
      pinImgElement.alt = pin.offer.title;
      pinElement.style.left = pin.location.x - SIZE_PIN.HALF_WIDTH + 'px';
      pinElement.style.top = pin.location.y - SIZE_PIN.HEIGHT + 'px';
      pinElement.style.display = 'none';
      return pinElement;
    }
    return null;
  };

  var successHandler = function (data) {
    pins = data;
    var MAX_COUNT = 5;
    var pinsCount = data.length > MAX_COUNT ? MAX_COUNT : data.length;
    for (var j = 0; j < pinsCount; j++) {
      cardFragment.appendChild(renderCards(data[j]));
    }

    for (var i = 0; i < 5; i++) {
      pinFragment.appendChild(renderPins(data[i]));
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

})();
