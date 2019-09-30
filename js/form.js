'use strict';

(function () {
  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
  var mapPinMainElement = mapPinsElement.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetList = adFormElement.querySelectorAll('.ad-form fieldset');
  var mapFiltersElement = window.util.mapElement.querySelector('.map__filters');
  var mapFiltersSelectList = mapFiltersElement.querySelectorAll('.map__filters select');
  var mapFiltersFieldsetElement = mapFiltersElement.querySelector('.map__filters fieldset');
  var addressInputElement = adFormElement.querySelector('#address');
  var roomNumberElement = adFormElement.querySelector('#room_number');
  var capacityElement = adFormElement.querySelector('#capacity');
  var capacityOptionElement = capacityElement.querySelectorAll('option');
  var coordsY = mapPinMainElement.offsetTop;
  var coordsX = mapPinMainElement.offsetLeft;
  var mainPinWidth = mapPinMainElement.offsetWidth;
  var mainPinHeight = mapPinMainElement.offsetHeight;
  var mainPinHeightCursor = mapPinMainElement.offsetHeight + 22;

  var addDisabledAttribute = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  var removeDisabledAttribute = function (element) {
    element.removeAttribute('disabled');
  };

  window.form = {
    roomNumberElement: roomNumberElement,
    capacityElement: capacityElement,
    capacityOptionElement: capacityOptionElement,
    mapPinsElement: mapPinsElement,
    mapFiltersElement: mapFiltersElement,
    addDisabledAttribute: addDisabledAttribute,
    removeDisabledAttribute: removeDisabledAttribute
  };

  var setActiveWindow = function () {
    window.util.mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    removeDisabledAttribute(mapFiltersFieldsetElement);
    window.util.doIterationCycle(adFormFieldsetList, removeDisabledAttribute);
    window.util.doIterationCycle(mapFiltersSelectList, removeDisabledAttribute);
    addressInputElement.value = (coordsX + Math.round(mainPinWidth / 2)) + ' ' + (coordsY + mainPinHeightCursor);
  };

  var setInactiveWindow = function () {
    window.util.doIterationCycle(adFormFieldsetList, addDisabledAttribute);
    window.util.doIterationCycle(mapFiltersSelectList, addDisabledAttribute);
    addDisabledAttribute(mapFiltersFieldsetElement);
    addressInputElement.value = (coordsX + Math.round(mainPinWidth / 2)) + ' ' + (coordsY + Math.round(mainPinHeight / 2));
  };

  mapPinMainElement.addEventListener('mousedown', function () {
    setActiveWindow();
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY_CODE) {
      setActiveWindow();
    }
  });

  window.addEventListener('load', function () {
    setInactiveWindow();
    if (roomNumberElement.value === '1') {
      addDisabledAttribute(capacityOptionElement[0]);
      addDisabledAttribute(capacityOptionElement[1]);
      addDisabledAttribute(capacityOptionElement[3]);
      capacityElement.value = '1';
    }
  });
})();
