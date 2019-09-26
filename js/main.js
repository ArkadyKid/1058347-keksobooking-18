'use strict';

var ARR_LENGTH = 8;
var pinFragment = document.createDocumentFragment();
var cardFragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapElement = document.querySelector('.map');
var mapFilterElement = mapElement.querySelector('.map__filters-container');
var mapPinsElement = mapElement.querySelector('.map__pins');
var typePopupElement = cardTemplate.querySelector('.popup__type');
var pinHeight = 70;
var pinHalfWidth = 50 / 2;
var titles = ['Отличное предложение', 'Выгодное предложение', 'Дешевое предложение', 'Уникальное предложение', 'Недорогое предложение', 'Суперпредложение', 'Суперпуперпредложение', 'Мегапредложение'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var avatars = [];
var pins = [];

var generateAvatar = function () {
  for (var i = 0; i < ARR_LENGTH; i++) {
    avatars[i] = 'img/avatars/user' + '0' + (i + 1) + '.png';
  }
  return avatars;
};

generateAvatar();

var generateXCoordinate = function () {
  var mapWidth = mapElement.offsetWidth;
  return Math.round(Math.random() * mapWidth);
};

var generateYCoordinate = function () {
  var maxYBlock = 630;
  var minYBlock = 130;
  return Math.round(Math.random() * (maxYBlock - minYBlock)) + minYBlock;
};

var generatePrice = function () {
  var maxPrice = 1000000;
  return Math.ceil(Math.random() * maxPrice);
};

var generateRandomType = function () {
  return types[Math.floor(Math.random() * types.length)];
};

var genarateRoom = function () {
  var maxRooms = 100;
  return Math.ceil(Math.random() * maxRooms);
};

var generateGuest = function () {
  var maxGuest = 10;
  return Math.round(Math.random() * maxGuest);
};

var generateCheckin = function () {
  return checkins[Math.floor(Math.random() * checkins.length)];
};

var generateCheckout = function () {
  return checkouts[Math.floor(Math.random() * checkouts.length)];
};

var generateType = function (card) {
  switch (card.offer.type) {
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
};

var generatePin = function () {
  for (var i = 0; i < ARR_LENGTH; i++) {
    pins[i] = {
      author: {
        avatar: avatars[i],
      },
      offer: {
        title: titles[i],
        address: '600, 300',
        price: generatePrice(),
        type: generateRandomType(),
        rooms: genarateRoom(),
        guests: generateGuest(),
        checkin: generateCheckin(),
        checkout: generateCheckout(),
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'описание',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      location: {
        x: generateXCoordinate(),
        y: generateYCoordinate(),
      }
    };
  }
  return pins;
};

generatePin();

var renderPins = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style.left = pin.location.x - pinHalfWidth + 'px';
  pinElement.style.top = pin.location.y - pinHeight + 'px';
  return pinElement;
};

var renderCards = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var popupFeatureElement = cardElement.querySelectorAll('.popup__feature');
  var popupPhotosElement = cardElement.querySelector('.popup__photos');
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';

  generateType(card);

  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  for (var i = 0; i < card.offer.features.length; i++) {
    popupFeatureElement[i].textContent = card.offer.features[i];
  }

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  // for (var j = 1; j < card.offer.photos.length; j++) {
  //   var popupPhotoCloneElement = cardElement.querySelector('.popup__photo').cloneNode();
  //   popupPhotosElement.appendChild(popupPhotoCloneElement);
  // }

  for (var j = 0; j < card.offer.photos.length; j++) {
    var popupPhotoCloneElement = cardElement.querySelector('.popup__photo').cloneNode();
    var popupPhotoElement = cardElement.querySelectorAll('.popup__photo');
    popupPhotoElement[j].src = card.offer.photos[j];
    popupPhotosElement.appendChild(popupPhotoCloneElement);
  }

  popupPhotosElement.parentElement.removeChild(popupPhotoElement);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  return cardElement;
};

for (var i = 0; i < ARR_LENGTH; i++) {
  cardFragment.appendChild(renderCards(pins[i]));
  pinFragment.appendChild(renderPins(pins[i]));
}

mapPinsElement.appendChild(pinFragment);
mapElement.insertBefore(cardFragment, mapFilterElement);
mapElement.classList.remove('map--faded');
