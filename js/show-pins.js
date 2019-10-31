'use strict';

(function () {

  var ENTER_KEY = window.util.KeyCode.ENTER;

  var LimitsPrice = {
    MIN: 10000,
    MAX: 50000
  };

  var pins = [];

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

  var showPinAfterFilter = window.updatePins.showPinAfterFilter;

  var mapFiltersElement = document.querySelector('.map__filters');
  var housingTypeElement = mapFiltersElement.querySelector('#housing-type');
  var housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
  var housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
  var housingPriceElement = mapFiltersElement.querySelector('#housing-price');
  var housingFeatureElement = mapFiltersElement.querySelector('#housing-features');
  var features = Array.from(housingFeatureElement.querySelectorAll('input'));

  var getFeature = function (el, filteredFeatures) {
    if (!filteredFeatures.length) {
      return true;
    }
    return filteredFeatures.every(function (feature) {
      return el.offer.features.includes(feature);
    });
  };

  var getType = function (el) {
    return housingTypeElement.value === 'any' || el.offer.type === housingTypeElement.value;
  };

  var getRooms = function (el) {
    return housingRoomsElement.value === 'any' || el.offer.rooms === +housingRoomsElement.value;
  };

  var getGuests = function (el) {
    return housingGuestsElement.value === 'any' || el.offer.guests === +housingGuestsElement.value;
  };

  var getPrice = function (el) {
    switch (housingPriceElement.value) {
      case 'middle':
        return el.offer.price >= LimitsPrice.MIN && el.offer.price <= LimitsPrice.MAX;
      case 'low':
        return el.offer.price < LimitsPrice.MIN;
      case 'high':
        return el.offer.price > LimitsPrice.MAX;
      default:
        return housingPriceElement.value === 'any';
    }
  };

  var getFiltered = function (el) {
    var filteredFeatures = features.filter(function (input) {
      return input.checked;
    })
      .map(function (input) {
        return input.value;
      });

    return getType(el) && getRooms(el) && getGuests(el) && getPrice(el) && getFeature(el, filteredFeatures);
  };

  var getFilterPins = function () {
    var filtered = pins.filter(function (el) {
      return getFiltered(el);
    });
    updatePins(filtered);
    showPinAfterFilter();
  };

  load(successHandler, errorHandler);
  mapFiltersElement.addEventListener('input', debounce(getFilterPins));
  mapFiltersElement.addEventListener('reset', function () {
    updatePins(pins);
  });
})();
