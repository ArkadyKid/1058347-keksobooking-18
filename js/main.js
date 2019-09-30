'use strict';

var ARR_LENGTH = 8;
var PIN_HEIGHT = 70;
var PIN_HALF_WIDTH = 50 / 2;
var ENTER_KEY_CODE = 13;
// var ESC_KEY_CODE = 27;
var pinFragment = document.createDocumentFragment();
var cardFragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapElement = document.querySelector('.map');
var mapPinsElement = mapElement.querySelector('.map__pins');
var mapPinMainElement = mapPinsElement.querySelector('.map__pin--main');
// var mapFilterElement = mapElement.querySelector('.map__filters-container');
var adFormElement = document.querySelector('.ad-form');
var adFormFieldsetList = adFormElement.querySelectorAll('.ad-form fieldset');
var mapFiltersElement = mapElement.querySelector('.map__filters');
var mapFiltersSelectList = mapFiltersElement.querySelectorAll('.map__filters select');
var mapFiltersFieldsetElement = mapFiltersElement.querySelector('.map__filters fieldset');
var addressInputElement = adFormElement.querySelector('#address');
var roomNumberElement = adFormElement.querySelector('#room_number');
var capacityElement = adFormElement.querySelector('#capacity');
var capacityOptionElement = capacityElement.querySelectorAll('option');
var coordsY = mapPinMainElement.offsetTop;
var coordsX = mapPinMainElement.offsetLeft;
var mainPinWidth = mapPinMainElement.offsetWidth;
var mainPinHeight = mapPinMainElement.offsetHeight;
var mainPinHeightCursor = mapPinMainElement.offsetHeight + 22;
var titles = ['Отличное предложение', 'Выгодное предложение', 'Дешевое предложение', 'Уникальное предложение', 'Недорогое предложение', 'Суперпредложение', 'Суперпуперпредложение', 'Мегапредложение'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var timeins = ['12:00', '13:00', '14:00'];
var timeouts = ['12:00', '13:00', '14:00'];
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
  var MAX_Y_BLOCK = 630;
  var MIN_Y_BLOCK = 130;
  return Math.round(Math.random() * (MAX_Y_BLOCK - MIN_Y_BLOCK)) + MIN_Y_BLOCK;
};

var generatePrice = function () {
  var MAX_PRICE = 1000000;
  return Math.ceil(Math.random() * MAX_PRICE);
};

var generateRandomType = function () {
  return types[Math.floor(Math.random() * types.length)];
};

var generateRoom = function () {
  var MAX_ROOMS = 100;
  return Math.ceil(Math.random() * MAX_ROOMS);
};

var generateGuest = function () {
  var MAX_GUESTS = 10;
  return Math.round(Math.random() * MAX_GUESTS);
};

var generateCheckin = function () {
  return timeins[Math.floor(Math.random() * timeins.length)];
};

var generateCheckout = function () {
  return timeouts[Math.floor(Math.random() * timeouts.length)];
};

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

var generatePin = function () {
  for (var i = 0; i < ARR_LENGTH; i++) {
    pins[i] = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: titles[i],
        address: '600, 300',
        price: generatePrice(),
        type: generateRandomType(),
        rooms: generateRoom(),
        guests: generateGuest(),
        checkin: generateCheckin(),
        checkout: generateCheckout(),
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'описание',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      location: {
        x: generateXCoordinate(),
        y: generateYCoordinate()
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
  pinElement.style.left = pin.location.x - PIN_HALF_WIDTH + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  return pinElement;
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
  return cardElement;
};

for (var i = 0; i < ARR_LENGTH; i++) {
  cardFragment.appendChild(renderCards(pins[i]));
  pinFragment.appendChild(renderPins(pins[i]));
}

// mapPinsElement.appendChild(pinFragment);
// mapElement.insertBefore(cardFragment, mapFilterElement);
// mapElement.classList.remove('map--faded');

var addDisabledAttribute = function (element) {
  element.setAttribute('disabled', 'disabled');
};

var removeDisabledAttribute = function (element) {
  element.removeAttribute('disabled');
};

var doIterationCycle = function (elements, doSomething) {
  for (var k = 0; k < elements.length; k++) {
    doSomething(elements[k]);
  }
};

var setActiveWindow = function () {
  mapElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');
  removeDisabledAttribute(mapFiltersFieldsetElement);
  doIterationCycle(adFormFieldsetList, removeDisabledAttribute);
  doIterationCycle(mapFiltersSelectList, removeDisabledAttribute);
  addressInputElement.value = (coordsX + Math.round(mainPinWidth / 2)) + ' ' + (coordsY + mainPinHeightCursor);
};

var setInactiveWindow = function () {
  doIterationCycle(adFormFieldsetList, addDisabledAttribute);
  doIterationCycle(mapFiltersSelectList, addDisabledAttribute);
  addDisabledAttribute(mapFiltersFieldsetElement);
  addressInputElement.value = (coordsX + Math.round(mainPinWidth / 2)) + ' ' + (coordsY + Math.round(mainPinHeight / 2));
};

window.addEventListener('load', function () {
  setInactiveWindow();
  if (roomNumberElement.value === '1') {
    addDisabledAttribute(capacityOptionElement[0]);
    addDisabledAttribute(capacityOptionElement[1]);
    addDisabledAttribute(capacityOptionElement[3]);
    capacityElement.value = '1';
  }
});

mapPinMainElement.addEventListener('mousedown', function () {
  setActiveWindow();
});

mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    setActiveWindow();
  }
});

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
    addDisabledAttribute(capacityOptionElement[3]);
    removeDisabledAttribute(capacityOptionElement[2]);
    capacityElement.value = '1';
  }
  if (roomNumberElement.value === '2') {
    addDisabledAttribute(capacityOptionElement[0]);
    removeDisabledAttribute(capacityOptionElement[2]);
    addDisabledAttribute(capacityOptionElement[3]);
    removeDisabledAttribute(capacityOptionElement[1]);
    capacityElement.value = '2';
  }
  if (roomNumberElement.value === '3') {
    addDisabledAttribute(capacityOptionElement[3]);
    removeDisabledAttribute(capacityOptionElement[1]);
    removeDisabledAttribute(capacityOptionElement[0]);
    removeDisabledAttribute(capacityOptionElement[2]);
    capacityElement.value = '3';
  }
});


