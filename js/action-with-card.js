'use strict';

(function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main');
  var popups = document.querySelectorAll('.popup');

  var showPopup = function (element) {
    pins[element].addEventListener('click', function () {
      for (var i = 0; i < pins.length; i++) {
        popups[i].style.display = 'none';
        pins[i].classList.remove('map__pin--active');
      }
      popups[element].style.display = null;
      pins[element].classList.add('map__pin--active');
    });
  };

  for (var i = 0; i < pins.length; i++) {
    showPopup(i);
  }
})();
