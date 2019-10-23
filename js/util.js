'use strict';

(function () {

  var SizePin = {
    HEIGHT: 70,
    HALF_WIDTH: 25
  };

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var DIFFERENT_OF_PIN_HEIGHT = 22;

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  var coordsPinY = mapPinMainElement.offsetTop;
  var coordsPinX = mapPinMainElement.offsetLeft;
  var mainPinWidth = mapPinMainElement.offsetWidth;
  var mainPinHeight = mapPinMainElement.offsetHeight;
  var mainPinHeightCursor = mapPinMainElement.offsetHeight + DIFFERENT_OF_PIN_HEIGHT;

  var doIterationCycle = function (elements, doSomething) {
    for (var i = 0; i < elements.length; i++) {
      doSomething(elements[i]);
    }
  };

  window.util = {
    SizePin: SizePin,
    KeyCode: KeyCode,
    mapElement: mapElement,
    coordsPinY: coordsPinY,
    coordsPinX: coordsPinX,
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight,
    mainPinHeightCursor: mainPinHeightCursor,
    mapPinMainElement: mapPinMainElement,
    doIterationCycle: doIterationCycle
  };
})();
