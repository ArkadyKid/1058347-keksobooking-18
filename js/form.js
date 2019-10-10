'use strict';

(function () {

  var coordsPinY = window.util.coordsPinY;
  var coordsPinX = window.util.coordsPinX;
  var mainPinWidth = window.util.mainPinWidth;
  var mainPinHeight = window.util.mainPinHeight;
  var mainPinHeightCursor = window.util.mainPinHeightCursor;
  var mapPinMainElement = window.util.mapPinMainElement;
  var mapElement = window.util.mapElement;

  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetList = adFormElement.querySelectorAll('.ad-form fieldset');
  var mapFiltersElement = window.util.mapElement.querySelector('.map__filters');
  var mapFiltersSelectList = mapFiltersElement.querySelectorAll('.map__filters select');
  var mapFiltersFieldsetElement = mapFiltersElement.querySelector('.map__filters fieldset');
  var addressInputElement = adFormElement.querySelector('#address');
  var roomNumberElement = adFormElement.querySelector('#room_number');
  var capacityElement = adFormElement.querySelector('#capacity');
  var capacityOptionElement = capacityElement.querySelectorAll('option');
  var titleElement = adFormElement.querySelector('#title');
  var priceElement = adFormElement.querySelector('#price');
  var typeElement = adFormElement.querySelector('#type');
  var timeInElement = adFormElement.querySelector('#timein');
  var timeOutElement = adFormElement.querySelector('#timeout');


  var addDisabledAttribute = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  var removeDisabledAttribute = function (element) {
    element.removeAttribute('disabled');
  };

  var showPins = function () {
    for (var i = 0; i < pinsElement.length; i++) {
      pinsElement[i].style.display = null;
    }
  };

  var setActiveWindow = function () {
    window.util.mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    removeDisabledAttribute(mapFiltersFieldsetElement);
    window.util.doIterationCycle(adFormFieldsetList, removeDisabledAttribute);
    window.util.doIterationCycle(mapFiltersSelectList, removeDisabledAttribute);
    showPins();
  };

  var setInactiveWindow = function () {
    window.util.doIterationCycle(adFormFieldsetList, addDisabledAttribute);
    window.util.doIterationCycle(mapFiltersSelectList, addDisabledAttribute);
    addDisabledAttribute(mapFiltersFieldsetElement);
    addressInputElement.value = (coordsPinX + Math.round(mainPinWidth / 2)) + ' ' + (coordsPinY + Math.round(mainPinHeight / 2));
  };

  window.slider(mapPinMainElement, mapElement, function (pinX, pinY) {
    addressInputElement.value = Math.round(pinX + (mainPinWidth / 2)) + ' ' + Math.round(pinY + mainPinHeightCursor);
  });

  window.addEventListener('load', function () {
    setInactiveWindow();
    if (roomNumberElement.value === '1') {
      addDisabledAttribute(capacityOptionElement[0]);
      addDisabledAttribute(capacityOptionElement[1]);
      addDisabledAttribute(capacityOptionElement[3]);
      capacityElement.value = '1';
      priceElement.placeholder = '1000';
      priceElement.min = 1000;
    }
  });

  mapPinMainElement.addEventListener('mousedown', function () {
    setActiveWindow();
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY_CODE) {
      setActiveWindow();
    }
  });


  window.form = {
    roomNumberElement: roomNumberElement,
    capacityElement: capacityElement,
    capacityOptionElement: capacityOptionElement,
    mapPinsElement: mapPinsElement,
    mapFiltersElement: mapFiltersElement,
    titleElement: titleElement,
    priceElement: priceElement,
    typeElement: typeElement,
    timeInElement: timeInElement,
    timeOutElement: timeOutElement,
    addDisabledAttribute: addDisabledAttribute,
    removeDisabledAttribute: removeDisabledAttribute
  };
})();
