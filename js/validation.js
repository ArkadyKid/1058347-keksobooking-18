'use strict';

(function () {
  var MAX_TITLE_SYMBOLS = 30;

  var MinPriceElement = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var GuestCount = {
    PALACE: '100',
    BUNGALO: '1',
    FLAT: '2',
    HOUSE: '3'
  };

  var CapacityOptionValue = {
    FOR_THREE_GUESTS: '3',
    FOR_TWO_GUESTS: '2',
    FOR_ONE_GUESTS: '1',
    NOT_FOR_GUESTS: '0'
  };

  var roomNumberElement = window.form.roomNumberElement;
  var capacityOptionList = window.form.capacityOptionList;
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
        priceElement.placeholder = MinPriceElement.BUNGALO;
        priceElement.min = MinPriceElement.BUNGALO;
        break;
      case 'flat':
        priceElement.placeholder = MinPriceElement.FLAT;
        priceElement.min = MinPriceElement.FLAT;
        break;
      case 'house':
        priceElement.placeholder = MinPriceElement.HOUSE;
        priceElement.min = MinPriceElement.HOUSE;
        break;
      case 'palace':
        priceElement.placeholder = MinPriceElement.PALACE;
        priceElement.min = MinPriceElement.PALACE;
        break;
    }
  };

  var compareTime = function (value, handleTime, changeTime) {
    if (handleTime.value === value) {
      changeTime.value = value;
    }
  };

  roomNumberElement.addEventListener('change', function () {
    if (roomNumberElement.value === GuestCount.PALACE) {
      addDisabledAttribute(capacityOptionList[0]);
      addDisabledAttribute(capacityOptionList[1]);
      addDisabledAttribute(capacityOptionList[2]);
      removeDisabledAttribute(capacityOptionList[3]);
      capacityElement.value = CapacityOptionValue.NOT_FOR_GUESTS;
    }
    if (roomNumberElement.value === GuestCount.BUNGALO) {
      addDisabledAttribute(capacityOptionList[0]);
      addDisabledAttribute(capacityOptionList[1]);
      removeDisabledAttribute(capacityOptionList[2]);
      addDisabledAttribute(capacityOptionList[3]);
      capacityElement.value = CapacityOptionValue.FOR_ONE_GUESTS;
    }
    if (roomNumberElement.value === GuestCount.FLAT) {
      addDisabledAttribute(capacityOptionList[0]);
      removeDisabledAttribute(capacityOptionList[1]);
      removeDisabledAttribute(capacityOptionList[2]);
      addDisabledAttribute(capacityOptionList[3]);
      capacityElement.value = CapacityOptionValue.FOR_TWO_GUESTS;
    }
    if (roomNumberElement.value === GuestCount.HOUSE) {
      removeDisabledAttribute(capacityOptionList[0]);
      removeDisabledAttribute(capacityOptionList[1]);
      removeDisabledAttribute(capacityOptionList[2]);
      addDisabledAttribute(capacityOptionList[3]);
      capacityElement.value = CapacityOptionValue.FOR_THREE_GUESTS;
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
    if (target.value.length < MAX_TITLE_SYMBOLS) {
      titleElement.setCustomValidity('минимальная длина 30 символов, сейчас длина ' + (target.value.length));
    } else {
      titleElement.setCustomValidity('');
    }
  });

  typeElement.addEventListener('change', checkType);

  priceElement.addEventListener('change', function () {
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
