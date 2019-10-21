'use strict';

(function () {

  var ENTER_KEY = window.util.KEY_CODE.ENTER;

  var pins = [];
  var sameType = [];
  var sameRooms = [];
  var sameGuests = [];
  var samePrice = [];

  var load = window.backend.load;
  var errorHandler = window.backend.errorHandler;
  var setActiveWindow = window.form.setActiveWindow;
  var mapPinMainElement = window.util.mapPinMainElement;
  var updatePins = window.updatePins.updatePins;
  var debounce = window.debounce.debounce;

  var successHandler = function (data) {
    pins = data;
    updatePins(pins);
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

  var showPinAfterFilter = window.updatePins.showPinAfterFilter;

  var housingTypeElement = document.querySelector('#housing-type');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingPriceElement = document.querySelector('#housing-price');
  var filterWiFiElement = document.querySelector('#filter-wifi');
  var filterDishwasherElement = document.querySelector('#filter-dishwasher');

  var setType = function (type) {
    sameType = pins.filter(function (pin) {
      return pin.offer.type === type;
    });
    updatePins(sameType);
    showPinAfterFilter();
  };

  var setRooms = function (rooms) {
    sameRooms = pins.filter(function (pin) {
      return pin.offer.rooms === rooms;
    });
    updatePins(sameRooms);
    showPinAfterFilter();
  };

  var setGuests = function (guests) {
    sameGuests = pins.filter(function (pin) {
      return pin.offer.guests === guests;
    });
    updatePins(sameGuests);
    showPinAfterFilter();
  };

  var setPrice = function (cb) {
    samePrice = pins.filter(cb);
    updatePins(samePrice);
    showPinAfterFilter();
  };

  var compareType = function () {
    switch (housingTypeElement.value) {
      case 'flat':
        setType('flat');
        break;
      case 'bungalo':
        setType('bungalo');
        break;
      case 'house':
        setType('house');
        break;
      case 'palace':
        setType('palace');
        break;
      default:
        updatePins(pins);
        showPinAfterFilter();
        break;
    }
  };

  var compareRooms = function () {
    switch (housingRoomsElement.value) {
      case '1':
        setRooms(1);
        break;
      case '2':
        setRooms(2);
        break;
      case '3':
        setRooms(3);
        break;
      default:
        updatePins(pins);
        showPinAfterFilter();
    }
  };

  var compareGuests = function () {
    switch (housingGuestsElement.value) {
      case '1':
        setGuests(1);
        break;
      case '2':
        setGuests(2);
        break;
      case '0':
        setGuests(0);
        break;
      default:
        updatePins(pins);
        showPinAfterFilter();
    }
  };

  var comparePrice = function () {
    switch (housingPriceElement.value) {
      case 'middle':
        setPrice(function (pin) {
          return pin.offer.price >= 10000 && pin.offer.price <= 50000;
        });
        break;
      case 'low':
        setPrice (function (pin) {
          return pin.offer.price < 10000;
        });
        break;
      case 'high':
        setPrice (function (pin) {
          return pin.offer.price > 50000;
        });
        break;
      default:
        updatePins(pins);
        showPinAfterFilter();
    }
  };

  var sameWifi = [];
  var sameDishwasher = [];
  var sameFeatures = [];
  var compareFeatures = function () {
    if (filterWiFiElement.checked) {
      sameWifi = pins.filter(function (pin) {
        for (var i = 0; i < pin.offer.features.length; i++) {
          return pin.offer.features[i] === 'wifi';
        }
      });
    } else if (filterDishwasherElement.checked) {
      sameDishwasher = pins.filter(function (pin) {
        for (var i = 0; i < pin.offer.features.length; i++) {
          return pin.offer.features[i] === 'dishwasher';
        }
      });
    }

    sameFeatures = sameWifi.concat(sameDishwasher);
    updatePins(sameFeatures);
    showPinAfterFilter();
  };

  housingTypeElement.addEventListener('input', debounce(compareType));
  housingRoomsElement.addEventListener('input', debounce(compareRooms));
  housingGuestsElement.addEventListener('input', debounce(compareGuests));
  housingPriceElement.addEventListener('input', debounce(comparePrice));
  filterWiFiElement.addEventListener('change', debounce(compareFeatures));
  filterDishwasherElement.addEventListener('change', debounce(compareFeatures));

  window.card = {
    pins: pins
  };
})();
