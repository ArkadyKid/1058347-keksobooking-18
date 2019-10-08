'use strict';

(function () {
  var cardFragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinFragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
  var mapFiltersElement = window.util.mapElement.querySelector('.map__filters-container');

  var generateType = function (card) {
    switch (card.offer.type) {
      case 'flat':
        card.offer.type = 'Квартира';
        break;
      case 'bungalo':
        card.offer.type = 'Бунгало';
        break;
      case 'house':
        card.offer.type = 'Дом';
        break;
      case 'palace':
        card.offer.type = 'Дворец';
        break;
    }
    return card.offer.type;
  };

  var renderCards = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupPhotosElement = cardElement.querySelector('.popup__photos');
    var popupPhotoElement = cardElement.querySelector('.popup__photo');
    var typePopupElement = cardElement.querySelector('.popup__type');
    var popupFeatureList = cardElement.querySelectorAll('.popup__feature');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';

    typePopupElement.textContent = generateType(card);

    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    for (var i = 0; i < card.offer.features.length; i++) {
      popupFeatureList[i].textContent = card.offer.features[i];
    }

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    popupPhotosElement.removeChild(popupPhotoElement);

    for (var k = 0; k < card.offer.photos.length; k++) {
      var popupPhotoCloneElement = popupPhotoElement.cloneNode();
      popupPhotosElement.appendChild(popupPhotoCloneElement);
      var popupPhotoList = cardElement.querySelectorAll('.popup__photo');
      popupPhotoList[k].src = card.offer.photos[k];
    }

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.style.display = 'none';
    return cardElement;
  };


  var renderPins = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.style.left = pin.location.x - window.util.PIN_HALF_WIDTH + 'px';
    pinElement.style.top = pin.location.y - window.util.PIN_HEIGHT + 'px';
    pinElement.style.display = 'none';
    return pinElement;
  };

  var successHandler = function (pins) {
      for (var j = 0; j < window.util.PINS_ARR_LENGTH; j++) {
        cardFragment.appendChild(renderCards(pins[j]));
      }

      for (var i = 0; i < window.util.PINS_ARR_LENGTH; i++) {
        pinFragment.appendChild(renderPins(pins[i]));
      }
      window.util.mapElement.insertBefore(cardFragment, mapFiltersElement);
      mapPinsElement.appendChild(pinFragment);
  };
  window.backend.load(successHandler)
})();
