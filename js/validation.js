'use strict';

(function () {
  window.form.roomNumberElement.addEventListener('change', function () {
    if (window.form.roomNumberElement.value === '100') {
      window.form.addDisabledAttribute(window.form.capacityOptionElement[0]);
      window.form.addDisabledAttribute(window.form.capacityOptionElement[1]);
      window.form.addDisabledAttribute(window.form.capacityOptionElement[2]);
      window.form.removeDisabledAttribute(window.form.capacityOptionElement[3]);
      window.form.capacityElement.value = '0';
    }
    if (window.form.roomNumberElement.value === '1') {
      window.form.addDisabledAttribute(window.form.capacityOptionElement[0]);
      window.form.addDisabledAttribute(window.form.capacityOptionElement[1]);
      window.form.addDisabledAttribute(window.form.capacityOptionElement[3]);
      window.form.removeDisabledAttribute(window.form.capacityOptionElement[2]);
      window.form.capacityElement.value = '1';
    }
    if (window.form.roomNumberElement.value === '2') {
      window.form.addDisabledAttribute(window.form.capacityOptionElement[0]);
      window.form.removeDisabledAttribute(window.form.capacityOptionElement[2]);
      window.form.addDisabledAttribute(window.form.capacityOptionElement[3]);
      window.form.removeDisabledAttribute(window.form.capacityOptionElement[1]);
      window.form.capacityElement.value = '2';
    }
    if (window.form.roomNumberElement.value === '3') {
      window.form.addDisabledAttribute(window.form.capacityOptionElement[3]);
      window.form.removeDisabledAttribute(window.form.capacityOptionElement[1]);
      window.form.removeDisabledAttribute(window.form.capacityOptionElement[0]);
      window.form.removeDisabledAttribute(window.form.capacityOptionElement[2]);
      window.form.capacityElement.value = '3';
    }
  });
}) ();
