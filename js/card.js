'use strict';

(function () {

  var ENTER_KEY = window.util.KEY_CODE.ENTER;

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

  load(successHandler, errorHandler);

  var showPinAfterFilter = window.updatePins.showPinAfterFilter;

  var housingTypeElement = document.querySelector('#housing-type');

  var setType = function (type) {
    var array = pins.filter(function (pin) {
      return pin.offer.type === type;
    });
    console.log(pins);
    console.log(array);
    updatePins(array);
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
    }
  };
  housingTypeElement.addEventListener('input', debounce(compareType));

  window.card = {
    pins: pins
  }
})();
