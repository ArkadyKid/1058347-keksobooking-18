'use strict';
(function () {
  var renderCards = function (card) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var popupPhotosElement = cardElement.querySelector('.popup__photos');
    var popupPhotoElement = cardElement.querySelector('.popup__photo');
    var typePopupElement = cardElement.querySelector('.popup__type');
    var popupTitleElement = cardElement.querySelector('.popup__title');
    var popupAddressElement = cardElement.querySelector('.popup__text--address');
    var popupPriceElement = cardElement.querySelector('.popup__text--price');
    var popupDescriptionElement = cardElement.querySelector('.popup__description');
    var popupCapacityElement = cardElement.querySelector('.popup__text--capacity');
    var popupTimeElement = cardElement.querySelector('.popup__text--time');
    var popupAvatarElement = cardElement.querySelector('.popup__avatar');

    var generateType = function (obj) {
      switch (obj.offer.type) {
        case 'flat':
          typePopupElement.textContent = 'Квартира';
          break;
        case 'bungalo':
          typePopupElement.textContent = 'Бунгало';
          break;
        case 'house':
          typePopupElement.textContent = 'Дом';
          break;
        case 'palace':
          typePopupElement.textContent = 'Дворец';
          break;
      }
      return obj.offer.type;
    };

    var setFeature = function () {
      var popupFeaturesElement = cardElement.querySelector('.popup__features');
      var popupFeatureElement = cardElement.querySelectorAll('.popup__feature');
      var popupFeatureWifiElement = cardElement.querySelector('.popup__feature--wifi');
      var popupFeatureDishwasherElement = cardElement.querySelector('.popup__feature--dishwasher');
      var popupFeatureParkingElement = cardElement.querySelector('.popup__feature--parking');
      var popupFeatureWasherElement = cardElement.querySelector('.popup__feature--washer');
      var popupFeatureElevatorElement = cardElement.querySelector('.popup__feature--elevator');
      var popupFeatureConditionerElement = cardElement.querySelector('.popup__feature--conditioner');

      var hidePopups = function () {
        for (var j = 0; j < popupFeatureElement.length; j++) {
          popupFeatureElement[j].style.display = 'none';
        }
      };

      var checkFeature = function () {
        for (var i = 0; i < card.offer.features.length; i++) {
          switch (card.offer.features[i]) {
            case 'wifi':
              popupFeatureWifiElement.style.display = null;
              break;
            case 'dishwasher':
              popupFeatureDishwasherElement.style.display = null;
              break;
            case 'parking':
              popupFeatureParkingElement.style.display = null;
              break;
            case 'washer':
              popupFeatureWasherElement.style.display = null;
              break;
            case 'elevator':
              popupFeatureElevatorElement.style.display = null;
              break;
            case 'conditioner':
              popupFeatureConditionerElement.style.display = null;
              break;
          }
        }
      };

      if (card.offer.features.length !== 0) {
        hidePopups();
        checkFeature();
      } else {
        cardElement.removeChild(popupFeaturesElement);
      }
    };

    var setPhotos = function () {
      popupPhotosElement.removeChild(popupPhotoElement);
      var checkPhotos = function () {
        for (var k = 0; k < card.offer.photos.length; k++) {
          var popupPhotoCloneElement = popupPhotoElement.cloneNode();
          popupPhotosElement.appendChild(popupPhotoCloneElement);
          var popupPhotoList = cardElement.querySelectorAll('.popup__photo');
          popupPhotoList[k].src = card.offer.photos[k];
        }
      };
      if (card.offer.photos.length !== 0) {
        checkPhotos();
      } else {
        cardElement.removeChild(popupPhotosElement);
      }
    };

    var setContent = function (property, element) {
      if (property.text !== '') {
        element.textContent = property;
      } else {
        cardElement.removeChild(element);
      }
    };

    setFeature();
    setPhotos();
    setContent(card.offer.title, popupTitleElement);
    setContent(card.offer.address, popupAddressElement);
    setContent(card.offer.description, popupDescriptionElement);
    generateType(card);

    if (card.offer.price.text !== '') {
      popupPriceElement.textContent = card.offer.price + ' ₽';
    } else {
      cardElement.removeChild(popupPriceElement);
    }

    if (card.offer.rooms.text !== '' && card.offer.guests.text !== '') {
      popupCapacityElement.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    } else {
      cardElement.removeChild(popupCapacityElement);
    }

    if (card.offer.checkin !== '' && card.offer.checkout.text !== '') {
      popupTimeElement.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    } else {
      cardElement.removeChild(popupTimeElement);
    }

    if (card.author.avatar !== '') {
      popupAvatarElement.src = card.author.avatar;
    } else {
      cardElement.removeChild(popupAvatarElement);
    }

    cardElement.style.display = 'none';
    return cardElement;
  };

  window.rendercards = {
    renderCards: renderCards
  };
})();
