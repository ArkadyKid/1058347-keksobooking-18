'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  var adFormElement = document.querySelector('.ad-form');
  var imgAvatarElement = adFormElement.querySelector('.ad-form-header__preview img');
  var roomImgElement = imgAvatarElement.cloneNode();
  var inputAvatarElement = adFormElement.querySelector('.ad-form-header__input');
  var inputRoomImgElement = adFormElement.querySelector('.ad-form__input');
  var imgWrapperRoomElement = adFormElement.querySelector('.ad-form__photo');

  var Image = function (input, image) {
    input.addEventListener('change', function () {
      var file = input.files[0];
      var fileName = file.name.toLowerCase();

      if (file) {
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            image.src = reader.result;
          })
        }
        reader.readAsDataURL(file);
      }
    });
  };

  new Image(inputAvatarElement, imgAvatarElement);
  new Image(inputRoomImgElement, roomImgElement);

  imgWrapperRoomElement.appendChild(roomImgElement);
  imgWrapperRoomElement.style.display = 'flex';
  imgWrapperRoomElement.style.justifyContent = 'center';
  imgWrapperRoomElement.style.alignItems = 'center';
  roomImgElement.alt = 'Фото квартиры';


  adFormElement.addEventListener('reset', function () {
    roomImgElement.src = 'img/muffin-grey.svg';
    imgAvatarElement.src = 'img/muffin-grey.svg';
  });
})();
