// 'use strict';
//
// (function () {
//   var pinFragment = document.createDocumentFragment();
//   var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
//   var mapPinsElement = window.util.mapElement.querySelector('.map__pins');
//   var mapFiltersElement = window.util.mapElement.querySelector('.map__filters-container');
//   // var titles = ['Отличное предложение', 'Выгодное предложение', 'Дешевое предложение', 'Уникальное предложение', 'Недорогое предложение', 'Суперпредложение', 'Суперпуперпредложение', 'Мегапредложение'];
//   // var types = ['palace', 'flat', 'house', 'bungalo'];
//   // var timeins = ['12:00', '13:00', '14:00'];
//   // var timeouts = ['12:00', '13:00', '14:00'];
//   // var avatars = [];
//   // var pins = [];
//
//   window.pin = {
//     pinTemplate: pinTemplate,
//     // pins: pins,
//     // mapFiltersElement: mapFiltersElement,
//     pinFragment: pinFragment
//   };
//
//   // var generateAvatar = function () {
//   //   for (var i = 0; i < window.util.PINS_ARR_LENGTH; i++) {
//   //     avatars[i] = 'img/avatars/user' + '0' + (i + 1) + '.png';
//   //   }
//   //   return avatars;
//   // };
//   //
//   // generateAvatar();
//   //
//   // var generateXCoordinate = function () {
//   //   var mapWidth = window.util.mapElement.offsetWidth;
//   //   return Math.round(Math.random() * mapWidth);
//   // };
//   //
//   // var generateYCoordinate = function () {
//   //   var MAX_Y_BLOCK = 630;
//   //   var MIN_Y_BLOCK = 130;
//   //   return Math.round(Math.random() * (MAX_Y_BLOCK - MIN_Y_BLOCK)) + MIN_Y_BLOCK + window.util.mainPinHeightCursor;
//   // };
//   //
//   // var generatePrice = function () {
//   //   var MAX_PRICE = 1000000;
//   //   return Math.ceil(Math.random() * MAX_PRICE);
//   // };
//   //
//   // var generateRandomType = function () {
//   //   return types[Math.floor(Math.random() * types.length)];
//   // };
//   //
//   // var generateRoom = function () {
//   //   var MAX_ROOMS = 100;
//   //   return Math.ceil(Math.random() * MAX_ROOMS);
//   // };
//   //
//   // var generateGuest = function () {
//   //   var MAX_GUESTS = 10;
//   //   return Math.round(Math.random() * MAX_GUESTS);
//   // };
//   //
//   // var generateCheckin = function () {
//   //   return timeins[Math.floor(Math.random() * timeins.length)];
//   // };
//   //
//   // var generateCheckout = function () {
//   //   return timeouts[Math.floor(Math.random() * timeouts.length)];
//   // };
//   //
//   // var generatePin = function () {
//   //   for (var i = 0; i < window.util.PINS_ARR_LENGTH; i++) {
//   //     pins[i] = {
//   //       author: {
//   //         avatar: avatars[i]
//   //       },
//   //       offer: {
//   //         title: titles[i],
//   //         address: '600, 300',
//   //         price: generatePrice(),
//   //         type: generateRandomType(),
//   //         rooms: generateRoom(),
//   //         guests: generateGuest(),
//   //         checkin: generateCheckin(),
//   //         checkout: generateCheckout(),
//   //         features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
//   //         description: 'описание',
//   //         photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
//   //       },
//   //       location: {
//   //         x: generateXCoordinate(),
//   //         y: generateYCoordinate()
//   //       }
//   //     };
//   //   }
//   //   return pins;
//   // };
//   //
//   // generatePin();
// })();
