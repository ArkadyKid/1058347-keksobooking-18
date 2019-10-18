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
  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');


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

  var hidePins = function (type, pins) {
    var pinElement = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var i = 0; i < pins.length; i++) {
      if (pins[i].offer.type !== type) {
        pinElement[i].style.display = 'none';
      } else {
        updatePins(pins);
        showPinAfterFilter();
      }
    }
  };

  var compareType = function (value, type) {
    if (housingTypeElement.value === value) {
      var array = pins.slice().filter(function (pin) {
        return pin.offer.type === type;
      });
      hidePins(type, array);
    }
  };

  housingTypeElement.addEventListener('input', function () {
    debounce(compareType('flat', 'Квартира'));
    debounce(compareType('bungalo', 'Бунгало'));
    debounce(compareType('house', 'Дом'));
    debounce(compareType('palace', 'Дворец'));
  });
})();
