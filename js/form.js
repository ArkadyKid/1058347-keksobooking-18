'use strict';

(function () {

  var HALF = 2;
  var MIN_PRICE_ELEMENT_ON_LOAD = 1000;
  var START_VALUE = '1';
  var START_PLACEHOLDER = '1000';
  var ESC_KEY_CODE = window.util.KeyCode.ESC;

  var StartCoordsMainPin = {
    X: '570px',
    Y: '375px'
  };

  var coordsPinY = window.util.coordsPinY;
  var coordsPinX = window.util.coordsPinX;
  var mainPinWidth = window.util.mainPinWidth;
  var mainPinHeight = window.util.mainPinHeight;
  var mainPinHeightCursor = window.util.mainPinHeightCursor;
  var mapPinMainElement = window.util.mapPinMainElement;
  var mapElement = window.util.mapElement;
  var upload = window.backend.upload;
  var errorHandler = window.backend.errorHandler;
  var slider = window.slider.create;

  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
  var adFormElement = document.querySelector('.ad-form');
  var adFormResetElement = adFormElement.querySelector('.ad-form__reset');
  var adFormFieldsetList = adFormElement.querySelectorAll('.ad-form fieldset');
  var mapFiltersElement = window.util.mapElement.querySelector('.map__filters');
  var mapFiltersSelectList = mapFiltersElement.querySelectorAll('.map__filters select');
  var mapFiltersFieldsetElement = mapFiltersElement.querySelector('.map__filters fieldset');
  var addressInputElement = adFormElement.querySelector('#address');
  var roomNumberElement = adFormElement.querySelector('#room_number');
  var capacityElement = adFormElement.querySelector('#capacity');
  var capacityOptionList = capacityElement.querySelectorAll('option');
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
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var i = 0; i < pinList.length; i++) {
      pinList[i].style.display = null;
    }
  };

  var hidePins = function () {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var i = 0; i < pinList.length; i++) {
      pinList[i].style.display = 'none';
    }
  };

  var hidePopups = function () {
    var popupList = document.querySelectorAll('.popup');
    for (var i = 0; i < popupList.length; i++) {
      popupList[i].style.display = 'none';
    }
  };

  var setStartRoomNumber = function () {
    if (roomNumberElement.value === START_VALUE) {
      addDisabledAttribute(capacityOptionList[0]);
      addDisabledAttribute(capacityOptionList[1]);
      addDisabledAttribute(capacityOptionList[3]);
      capacityElement.value = START_VALUE;
      priceElement.placeholder = START_PLACEHOLDER;
      priceElement.min = MIN_PRICE_ELEMENT_ON_LOAD;
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

  var setAddressInputValue = function () {
    addressInputElement.value = (coordsPinX + Math.round(mainPinWidth / HALF)) + ' ' + (coordsPinY + Math.round(mainPinHeight / HALF));
  };

  var setInactiveWindow = function () {
    window.util.doIterationCycle(adFormFieldsetList, addDisabledAttribute);
    window.util.doIterationCycle(mapFiltersSelectList, addDisabledAttribute);
    window.util.mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    addDisabledAttribute(mapFiltersFieldsetElement);
    mapFiltersElement.reset();
    setStartRoomNumber();
    setAddressInputValue();
  };

  var setStartCoordsPin = function () {
    mapPinMainElement.style.left = StartCoordsMainPin.X;
    mapPinMainElement.style.top = StartCoordsMainPin.Y;
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

  slider(mapPinMainElement, mapElement, function (pinX, pinY) {
    addressInputElement.value = Math.round(pinX + (mainPinWidth / HALF)) + ' ' + Math.round(pinY + mainPinHeightCursor);
  });

  window.addEventListener('load', function () {
    setInactiveWindow();
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

  adFormResetElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    adFormElement.reset();
    setStartRoomNumber();
    setStartCoordsPin();
  });

  adFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    upload(new FormData(adFormElement), successHandler, errorHandler);
  });

  window.form = {
    roomNumberElement: roomNumberElement,
    capacityElement: capacityElement,
    capacityOptionList: capacityOptionList,
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
    showPins: showPins,
    adFormResetElement: adFormResetElement,
    adFormElement: adFormElement
  };
})();
