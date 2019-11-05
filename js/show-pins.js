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
  };

  var showPinAfterFilter = window.updatePins.showPinAfterFilter;

  var mapElement = document.querySelector('.map');
  var mapFiltersElement = mapElement.querySelector('.map__filters');
  var housingTypeElement = mapFiltersElement.querySelector('#housing-type');
  var housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
  var housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
  var housingPriceElement = mapFiltersElement.querySelector('#housing-price');
  var housingFeatureElement = mapFiltersElement.querySelector('#housing-features');
  var features = Array.from(housingFeatureElement.querySelectorAll('input'));

  var getFeature = function (element, filteredFeatures) {
    if (!filteredFeatures.length) {
      return true;
    }
    return filteredFeatures.every(function (feature) {
      return element.offer.features.includes(feature);
    });
  };

  var getType = function (element) {
    return housingTypeElement.value === 'any' || element.offer.type === housingTypeElement.value;
  };

  var getRooms = function (element) {
    return housingRoomsElement.value === 'any' || element.offer.rooms === +housingRoomsElement.value;
  };

  var getGuests = function (element) {
    return housingGuestsElement.value === 'any' || element.offer.guests === +housingGuestsElement.value;
  };

  var getPrice = function (element) {
    switch (housingPriceElement.value) {
      case 'middle':
        return element.offer.price >= LimitsPrice.MIN && element.offer.price <= LimitsPrice.MAX;
      case 'low':
        return element.offer.price < LimitsPrice.MIN;
      case 'high':
        return element.offer.price > LimitsPrice.MAX;
      default:
        return housingPriceElement.value === 'any';
    }
  };

  var getFiltered = function (element) {
    var filteredFeatures = features.filter(function (input) {
      return input.checked;
    })
      .map(function (input) {
        return input.value;
      });
    return getType(element) && getRooms(element) && getGuests(element) && getPrice(element) && getFeature(element, filteredFeatures);
  };

  var getFilterPins = function () {
    var filtered = pins.filter(function (element) {
      return getFiltered(element);
    });
    updatePins(filtered);
    showPinAfterFilter();
  };

  mapPinMainElement.addEventListener('mousedown', function () {
    if (mapElement.classList.contains('map--faded')) {
      load(successHandler, errorHandler, setActiveWindow);
    }
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY && mapElement.classList.contains('map--faded')) {
      load(successHandler, errorHandler, setActiveWindow);
    }
  });

  mapFiltersElement.addEventListener('input', debounce(getFilterPins));
  mapFiltersElement.addEventListener('reset', function () {
    updatePins(pins);
  });
})();
