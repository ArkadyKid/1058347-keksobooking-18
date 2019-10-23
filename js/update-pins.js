'use strict';

(function () {
  var MAX_COUNT = 5;

  var SizePin = {
    HALF_WIDTH: window.util.SizePin.HALF_WIDTH,
    HEIGHT: window.util.SizePin.HEIGHT
  };

  var mapElement = window.util.mapElement;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
  var mapFiltersElement = window.util.mapElement.querySelector('.map__filters-container');
  var renderCards = window.renderCards.renderCards;

  var renderPins = function (el) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImgElement = pinElement.querySelector('img');

    pinImgElement.src = el.author.avatar;
    pinImgElement.alt = el.offer.title;
    pinElement.style.left = el.location.x - SizePin.HALF_WIDTH + 'px';
    pinElement.style.top = el.location.y - SizePin.HEIGHT + 'px';
    pinElement.style.display = 'none';
    return pinElement;
  };

  var removeList = function (list, parent) {
    if (list) {
      for (var m = 0; m < list.length; m++) {
        parent.removeChild(list[m]);
      }
    }
  };

  var remove = {
    pins: function () {
      var pinList = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      removeList(pinList, mapPinsElement);
    },
    popups: function () {
      var popupList = window.util.mapElement.querySelectorAll('.popup');
      removeList(popupList, mapElement);
    }
  };

  var updatePins = function (pins) {
    var cardFragment = document.createDocumentFragment();
    var pinFragment = document.createDocumentFragment();

    var pinsCount = pins.length > MAX_COUNT ? MAX_COUNT : pins.length;

    for (var i = 0; i < pinsCount; i++) {
      pinFragment.appendChild(renderPins(pins[i]));
    }

    for (var j = 0; j < pinsCount; j++) {
      cardFragment.appendChild(renderCards(pins[j]));
    }

    remove.pins();
    remove.popups();
    window.util.mapElement.insertBefore(cardFragment, mapFiltersElement);
    mapPinsElement.appendChild(pinFragment);

    for (var l = 0; l < pinsCount; l++) {
      window.actionCard.show(l);
      window.actionCard.close(l);
    }
  };

  var showPinAfterFilter = function () {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var k = 0; k < pinList.length; k++) {
      pinList[k].style.display = null;
    }
  };

  window.updatePins = {
    updatePins: updatePins,
    showPinAfterFilter: showPinAfterFilter
  };
})();
