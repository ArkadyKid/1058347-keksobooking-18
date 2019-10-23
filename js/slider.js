'use strict';

(function () {

  window.slider = function (element, block, setCoords) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var Coordinates = function (x, y) {
        this.x = x;
        this.y = y;
      };

      var startCoords = new Coordinates(evt.clientX, evt.clientY);

      var getCoords = function (mouseEvt) {
        var shift = new Coordinates(startCoords.x - mouseEvt.clientX, startCoords.y - mouseEvt.clientY);

        var coordsX = element.offsetLeft - shift.x;
        var coordsY = element.offsetTop - shift.y;

        var limitsSizeBlock = {
          left: 0 - element.offsetWidth / 2,
          right: block.offsetWidth - element.offsetWidth / 2,
          top: 130,
          bottom: 630
        };

        startCoords = new Coordinates(mouseEvt.clientX, mouseEvt.clientY);

        if (coordsX < limitsSizeBlock.left) {
          coordsX = limitsSizeBlock.left;
        }
        if (coordsX > limitsSizeBlock.right) {
          coordsX = limitsSizeBlock.right;
        }
        if (coordsY > limitsSizeBlock.bottom) {
          coordsY = limitsSizeBlock.bottom;
        }
        if (coordsY < limitsSizeBlock.top) {
          coordsY = limitsSizeBlock.top;
        }

        element.style.left = coordsX + 'px';
        element.style.top = coordsY + 'px';

        setCoords(coordsX, coordsY);
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
            element.removeEventListener('click', onClickPreventDefault);
          };
          element.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
