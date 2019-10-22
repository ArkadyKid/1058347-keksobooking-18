'use strict';

(function () {

  var ENTER_KEY = window.util.KEY_CODE.ENTER;

  var pins = [];
  var sameType = [];
  var sameRooms = [];
  var sameGuests = [];
  var samePrice = [];
  var sameFilter = [];

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

  var mapFiltersElement = document.querySelector('.map__filters');
  var housingTypeElement = mapFiltersElement.querySelector('#housing-type');
  var housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
  var housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
  var housingPriceElement = mapFiltersElement.querySelector('#housing-price');
  var filterWiFiElement = mapFiltersElement.querySelector('#filter-wifi');
  var filterDishwasherElement = mapFiltersElement.querySelector('#filter-dishwasher');

  var setType = function () {
    sameType = pins.filter(function (el) {
        return housingTypeElement.value === 'any' || el.offer.type === housingTypeElement.value;
      }
    );
    updatePins(sameType);
    showPinAfterFilter();
  };

  var setRooms = function () {
    sameRooms = pins.filter(function (el) {
      return housingRoomsElement.value === 'any' || el.offer.rooms === +housingRoomsElement.value;
    });
    updatePins(sameRooms);
    showPinAfterFilter();
  };

  var setGuests = function () {
    sameGuests = pins.filter(function (el) {
      return housingGuestsElement.value === 'any' || el.offer.guests === +housingGuestsElement.value;

    });
    updatePins(sameGuests);
    showPinAfterFilter();
  };

  var setFilter = function (cb) {
    samePrice = pins.filter(cb);
    updatePins(samePrice);
    showPinAfterFilter();
  };

  var setPrice = function (cb) {
    samePrice = pins.filter(cb);
    updatePins(samePrice);
    showPinAfterFilter();
  };

  // var compareType = function (el) {
  //   return housingTypeElement.value === 'any' || el.offer.type === housingTypeElement;
  // };
  //
  // var compareRooms = function () {
  //   switch (housingRoomsElement.value) {
  //     case '1':
  //       setRooms(1);
  //       break;
  //     case '2':
  //       setRooms(2);
  //       break;
  //     case '3':
  //       setRooms(3);
  //       break;
  //     default:
  //       updatePins(pins);
  //       showPinAfterFilter();
  //   }
  // };

  // var compareGuests = function () {
  //   switch (housingGuestsElement.value) {
  //     case '1':
  //       setGuests(1);
  //       break;
  //     case '2':
  //       setGuests(2);
  //       break;
  //     case '0':
  //       setGuests(0);
  //       break;
  //     default:
  //       updatePins(pins);
  //       showPinAfterFilter();
  //   }
  // };

  var comparePrice = function () {
    switch (housingPriceElement.value) {
      case 'middle':
        setPrice(function (pin) {
          return pin.offer.price >= 10000 && pin.offer.price <= 50000;
        });
        break;
      case 'low':
        setPrice(function (pin) {
          return pin.offer.price < 10000;
        });
        break;
      case 'high':
        setPrice(function (pin) {
          return pin.offer.price > 50000;
        });
        break;
      default:
        updatePins(pins);
        showPinAfterFilter();
    }
  };

  var sameDishwasher = [];
  var compareFeatures = function () {
    if (filterDishwasherElement.checked) {
      sameDishwasher = pins.filter(function (pin) {
        for (var i = 0; i < pin.offer.features.length; i++) {
          return pin.offer.features[i] === 'dishwasher';
        }
      });
    }

    updatePins(sameDishwasher);
    showPinAfterFilter();
  };

  mapFiltersElement.addEventListener('input', debounce(setGuests));
  // housingRoomsElement.addEventListener('input', debounce(compareRooms));
  // housingGuestsElement.addEventListener('input', debounce(compareGuests));
  // housingPriceElement.addEventListener('input', debounce(comparePrice));
  // filterWiFiElement.addEventListener('change', debounce(compareFeatures));
  // filterDishwasherElement.addEventListener('change', debounce(compareFeatures));

  window.card = {
    pins: pins
  };
})();
