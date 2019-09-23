'use strict';

var ARR_LENGTH = 8;
var fragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapElement = document.querySelector('.map');
var mapPinsElement = mapElement.querySelector('.map__pins');
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

var generatePin = function () {
  for (var i = 0; i < ARR_LENGTH; i++) {
    pins[i] = {
      'author': {
        'avatar': avatars[i],
      },
      'offer': {
        'title': titles[i],
        'address': '600, 300',
        'type': generateRandomType(),
        'rooms': genarateRoom(),
        'guests': generateGuest(),
        'checkin': generateCheckin(),
        'checkout': generateCheckout(),
        'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        'description': 'описание',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      'location': {
        'x': generateXCoordinate(),
        'y': generateYCoordinate(),
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

for (var i = 0; i < ARR_LENGTH; i++) {
  fragment.appendChild(renderPins(pins[i]));
}

mapPinsElement.appendChild(fragment);
mapElement.classList.remove('map--faded');
