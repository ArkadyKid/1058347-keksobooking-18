'use strict';

(function () {

  window.slider = function (element, block, setCoords) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var getCoords = function (mouseEvt) {
        var shift = {
          x: startCoords.x - mouseEvt.clientX,
          y: startCoords.y - mouseEvt.clientY
        };

        var coordsX = element.offsetLeft - shift.x;
        var coordsY = element.offsetTop - shift.y;

        var limitsSizeBlock = {
          left: 0 - element.offsetWidth / 2,
          right: block.offsetWidth - element.offsetWidth / 2,
          top: 130,
          bottom: 630
        };

        startCoords = {
          x: mouseEvt.clientX,
          y: mouseEvt.clientY
        };

        if (coordsX < limitsSizeBlock.left) {
          coordsX = limitsSizeBlock.left;
          stopMouse();
        }
        if (coordsX > limitsSizeBlock.right) {
          coordsX = limitsSizeBlock.right;
          stopMouse();
        }
        if (coordsY > limitsSizeBlock.bottom) {
          coordsY = limitsSizeBlock.bottom;
          stopMouse();
        }
        if (coordsY < limitsSizeBlock.top) {
          coordsY = limitsSizeBlock.top;
          stopMouse();
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

      var stopMouse = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
