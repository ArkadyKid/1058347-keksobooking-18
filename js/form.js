'use strict';

(function () {
  var StartCoordsMainPin = {
    X: '570px',
    Y: '375px'
  };

  var HALF = 2;
  var ESC_KEY_CODE = window.util.KeyCode.ESC;
  var MIN_PRICE_ELEMENT_ON_LOAD = 1000;

  var coordsPinY = window.util.coordsPinY;
  var coordsPinX = window.util.coordsPinX;
  var mainPinWidth = window.util.mainPinWidth;
  var mainPinHeight = window.util.mainPinHeight;
  var mainPinHeightCursor = window.util.mainPinHeightCursor;
  var mapPinMainElement = window.util.mapPinMainElement;
  var mapElement = window.util.mapElement;
  var upload = window.backend.upload;
  var errorHandler = window.backend.errorHandler;

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
    var pinElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var i = 0; i < pinElement.length; i++) {
      pinElement[i].style.display = null;
    }
  };

  var hidePins = function () {
    var pinElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var i = 0; i < pinElement.length; i++) {
      pinElement[i].style.display = 'none';
    }
  };

  var hidePopups = function () {
    var popupElement = document.querySelectorAll('.popup');
    for (var i = 0; i < popupElement.length; i++) {
      popupElement[i].style.display = 'none';
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
    window.util.mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    addDisabledAttribute(mapFiltersFieldsetElement);
    mapFiltersElement.reset();
    addressInputElement.value = (coordsPinX + Math.round(mainPinWidth / HALF)) + ' ' + (coordsPinY + Math.round(mainPinHeight / HALF));
  };

  var setStartCoordsPin = function () {
    mapPinMainElement.style.left = StartCoordsMainPin.X;
    mapPinMainElement.style.top = StartCoordsMainPin.Y;
  };

  var setStartRoomNumber = function () {
    if (roomNumberElement.value === '1') {
      addDisabledAttribute(capacityOptionElement[0]);
      addDisabledAttribute(capacityOptionElement[1]);
      addDisabledAttribute(capacityOptionElement[3]);
      capacityElement.value = '1';
      priceElement.placeholder = '1000';
      priceElement.min = MIN_PRICE_ELEMENT_ON_LOAD;
    }
  };

  var showSuccessBlock = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    document.body.appendChild(successElement);

    var onEscKeySuccessElement = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        evt.preventDefault();
        document.body.removeChild(successElement);
      }
      document.removeEventListener('keydown', onEscKeySuccessElement);
    };

    var onClickSuccessElement = function (evt) {
      evt.preventDefault();
      document.body.removeChild(successElement);
      successElement.removeEventListener('click', onClickSuccessElement);
    };

    document.addEventListener('keydown', onEscKeySuccessElement);
    successElement.addEventListener('click', onClickSuccessElement);
  };

  window.slider(mapPinMainElement, mapElement, function (pinX, pinY) {
    addressInputElement.value = Math.round(pinX + (mainPinWidth / HALF)) + ' ' + Math.round(pinY + mainPinHeightCursor);
  });

  window.addEventListener('load', function () {
    setInactiveWindow();
    setStartRoomNumber();
  });

  var successHandler = function () {
    setInactiveWindow();
    hidePins();
    setStartCoordsPin();
    hidePopups();
    adFormElement.reset();
    setStartRoomNumber();
    showSuccessBlock();
  };

  adFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    upload(new FormData(adFormElement), successHandler, errorHandler);
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
    removeDisabledAttribute: removeDisabledAttribute,
    setActiveWindow: setActiveWindow,
    showPins: showPins
  };
})();
