'use strict';

(function () {

  var roomNumberElement = window.form.roomNumberElement;
  var capacityOptionElement = window.form.capacityOptionElement;
  var capacityElement = window.form.capacityElement;
  var titleElement = window.form.titleElement;
  var typeElement = window.form.typeElement;
  var priceElement = window.form.priceElement;
  var timeInElement = window.form.timeInElement;
  var timeOutElement = window.form.timeOutElement;

  var addDisabledAttribute = window.form.addDisabledAttribute;
  var removeDisabledAttribute = window.form.removeDisabledAttribute;

  var checkType = function () {
    switch (typeElement.value) {
      case 'bungalo':
        priceElement.placeholder = '0';
        priceElement.min = 0;
        break;
      case 'flat':
        priceElement.placeholder = '1000';
        priceElement.min = 1000;
        break;
      case 'house':
        priceElement.placeholder = '5000';
        priceElement.min = 5000;
        break;
      case 'palace':
        priceElement.placeholder = '10000';
        priceElement.min = 10000;
        break;
    }
  };

  var compareTime = function (value, handleTime, changeTime) {
    if (handleTime.value === value) {
      changeTime.value = value;
    }
  };

  roomNumberElement.addEventListener('change', function () {
    if (roomNumberElement.value === '100') {
      addDisabledAttribute(capacityOptionElement[0]);
      addDisabledAttribute(capacityOptionElement[1]);
      addDisabledAttribute(capacityOptionElement[2]);
      removeDisabledAttribute(capacityOptionElement[3]);
      capacityElement.value = '0';
    }
    if (roomNumberElement.value === '1') {
      addDisabledAttribute(capacityOptionElement[0]);
      addDisabledAttribute(capacityOptionElement[1]);
      removeDisabledAttribute(capacityOptionElement[2]);
      addDisabledAttribute(capacityOptionElement[3]);
      capacityElement.value = '1';
    }
    if (roomNumberElement.value === '2') {
      addDisabledAttribute(capacityOptionElement[0]);
      removeDisabledAttribute(capacityOptionElement[1]);
      removeDisabledAttribute(capacityOptionElement[2]);
      addDisabledAttribute(capacityOptionElement[3]);
      capacityElement.value = '2';
    }
    if (roomNumberElement.value === '3') {
      removeDisabledAttribute(capacityOptionElement[0]);
      removeDisabledAttribute(capacityOptionElement[1]);
      removeDisabledAttribute(capacityOptionElement[2]);
      addDisabledAttribute(capacityOptionElement[3]);
      capacityElement.value = '3';
    }
  });

  titleElement.addEventListener('invalid', function () {
    if (titleElement.validity.tooShort) {
      titleElement.setCustomValidity('минимальная длина 30 символов');
    } else if (titleElement.validity.tooLong) {
      titleElement.setCustomValidity('максимальная длина 100 символов');
    } else if (titleElement.validity.valueMissing) {
      titleElement.setCustomValidity('обязательное поле');
    } else {
      titleElement.setCustomValidity('');
    }
  });

  titleElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      titleElement.setCustomValidity('минимальная длина 30 символов, сейчас длина ' + (target.value.length));
    } else {
      titleElement.setCustomValidity('');
    }
  });

  typeElement.addEventListener('change', checkType);

  priceElement.addEventListener('invalid', function () {
    if (priceElement.validity.rangeUnderflow) {
      priceElement.setCustomValidity('минимальная цена ' + priceElement.min + ' руб');
    } else {
      priceElement.setCustomValidity('');
    }
  });

  timeInElement.addEventListener('change', function () {
    compareTime('12:00', timeInElement, timeOutElement);
    compareTime('13:00', timeInElement, timeOutElement);
    compareTime('14:00', timeInElement, timeOutElement);
  });

  timeOutElement.addEventListener('change', function () {
    compareTime('12:00', timeOutElement, timeInElement);
    compareTime('13:00', timeOutElement, timeInElement);
    compareTime('14:00', timeOutElement, timeInElement);
  });
})();
