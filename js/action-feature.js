'use strict';

(function () {
  var ENTER = window.util.KeyCode.ENTER;

  var featuresList = document.querySelector('#housing-features');
  var mapFeatureElement = featuresList.querySelectorAll('.map__feature');
  var mapFeatureInputElement = featuresList.querySelectorAll('input');

  var setCheckedAttribute = function (el) {
    if (mapFeatureInputElement[el].checked) {
      mapFeatureInputElement[el].removeAttribute('checked');
    } else {
      mapFeatureInputElement[el].setAttribute('checked', 'checked');
    }
  };

  // var onFeatureEnterPress = function (evt) {
  //   if (evt.keyCode === ENTER) {
  //     for (var i = 0; i < mapFeatureElement.length; i++) {
  //       evt.preventDefault();
  //       setCheckedAttribute(i);
  //     }
  //   }
  // };

  mapFeatureElement.forEach(function (el) {
    el.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER) {
        evt.preventDefault();
        setCheckedAttribute(el);
      }
    })
  });
})();
