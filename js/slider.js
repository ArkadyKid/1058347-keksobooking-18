'use strict';

(function () {
  window.slider = function (handler, element, block, someFunction) {
    handler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var getCoords = function (evt) {
        var shift = {
          x: startCoords.x - evt.clientX,
          y: startCoords.y - evt.clientY
        };

        var coordsX = element.offsetLeft - shift.x;
        var coordsY = element.offsetTop - shift.y;

        var limitsSizeBlock = {
          left: 0 - handler.offsetWidth / 2,
          right: block.offsetWidth - handler.offsetWidth / 2,
          top: 130 - handler.offsetHeight - 22,
          bottom: 630
        };

        startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        if (coordsX < limitsSizeBlock.right && coordsX > limitsSizeBlock.left && coordsY > limitsSizeBlock.top && coordsY < limitsSizeBlock.bottom) {
          element.style.left = coordsX + 'px';
          element.style.top = coordsY + 'px';
        }

        window.pinX = coordsX;
        window.pinY = coordsY;
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {

        moveEvt.preventDefault();
        dragged = true;
        getCoords(moveEvt);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        getCoords(upEvt);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            handler.removeEventListener('click', onClickPreventDefault);
          };
          handler.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
    element.addEventListener('mousemove', someFunction);
  }
})();
