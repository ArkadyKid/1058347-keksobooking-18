'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
  var DEFAULT_IMG_URL = 'img/muffin-grey.svg';

  var adFormElement = document.querySelector('.ad-form');
  var imgAvatarElement = adFormElement.querySelector('.ad-form-header__preview img');
  var roomImgElement = imgAvatarElement.cloneNode();
  var inputAvatarElement = adFormElement.querySelector('.ad-form-header__input');
  var inputRoomImgElement = adFormElement.querySelector('.ad-form__input');
  var imgWrapperRoomElement = adFormElement.querySelector('.ad-form__photo');

  imgWrapperRoomElement.appendChild(roomImgElement);
  imgWrapperRoomElement.style.display = 'flex';
  imgWrapperRoomElement.style.justifyContent = 'center';
  imgWrapperRoomElement.style.alignItems = 'center';
  roomImgElement.alt = 'Фото квартиры';

  var onChangeInput = function (input, image) {
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
        });
      }
      reader.readAsDataURL(file);
    }
  };

  inputAvatarElement.addEventListener('change', function () {
    onChangeInput(inputAvatarElement, imgAvatarElement);
  });

  inputRoomImgElement.addEventListener('change', function () {
    onChangeInput(inputRoomImgElement, roomImgElement);
  });


  adFormElement.addEventListener('reset', function () {
    roomImgElement.src = DEFAULT_IMG_URL;
    imgAvatarElement.src = DEFAULT_IMG_URL;
  });
})();
