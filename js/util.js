'use strict';

(function () {
  var PINS_ARR_LENGTH = 8;
  var PIN_HEIGHT = 70;
  var PIN_HALF_WIDTH = 50 / 2;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var mapElement = document.querySelector('.map');

  var doIterationCycle = function (elements, doSomething) {
    for (var i = 0; i < elements.length; i++) {
      doSomething(elements[i]);
    }
  };

  window.util = {
    PINS_ARR_LENGTH: PINS_ARR_LENGTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_HALF_WIDTH: PIN_HALF_WIDTH,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    mapElement: mapElement,
    doIterationCycle: doIterationCycle;
  }
})();
