'use strict';

var photoArr = [];

for (var i = 0; i < 26; i++) {
  photoArr.push({
    url: 'photos/' + ((Math.round((Math.random() * 24))) + 1) + '.jpg',
    description: 'Все хорошо',
    likes: Math.round((Math.random() * 25)),
    comments: [{
      avatar: 'img/avatar-2.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артем'
    },
    {
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.Лососни тунца.',
      name: 'Артем'
    }
    ]
  }
  );
}

var pictureTemplate = document.querySelector('#picture').content;
var picturesField = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var j = 0; j < 26; j++) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photoArr[j].url;
  picture.querySelector('.picture__comments').textContent = photoArr[j].comments.length;
  picture.querySelector('.picture__likes').textContent = photoArr[j].likes;
  fragment.append(picture);
}

picturesField.append(fragment);


// Новый модуль

var bigScreen = document.querySelector('.big-picture');
var closeButtonBigScreen = document.querySelector('.big-picture__cancel');

bigScreen.querySelector('.big-picture__img img').src = photoArr[0].url;
bigScreen.querySelector('.big-picture__social .likes-count').textContent = photoArr[0].likes;
bigScreen.querySelector('.big-picture__social .comments-count').textContent = photoArr[0].comments.length;
bigScreen.querySelector('.social__caption').textContent = photoArr[0].description;
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

// Крестик
var closeBigScreen = function (evt) {
  if (evt.key === 'Escape' || evt.button === 0) {
    bigScreen.classList.add('hidden');
    document.querySelector('body').classList.toggle('modal-open');
    closeButtonBigScreen.removeEventListener('click', closeBigScreen);
    document.removeEventListener('keydown', closeBigScreen);
  }
};

var openBigScreen = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    bigScreen.classList.remove('hidden');
    document.querySelector('body').classList.toggle('modal-open');
    closeButtonBigScreen.addEventListener('click', closeBigScreen);
    document.addEventListener('keydown', closeBigScreen);
  }
};

document.querySelector('.picture').addEventListener('click', openBigScreen);

// генерируем комменты
var commentBascket = document.createDocumentFragment();
var createComments = function () {

  for (var q = 0; q < photoArr[0].comments.length; q++) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');

    var avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = photoArr[0].comments[q].avatar;
    avatar.alt = photoArr[0].comments[q].name;
    avatar.width = 35;
    avatar.height = 35;
    comment.append(avatar);

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = photoArr[0].comments[q].message;

    comment.append(text);
    commentBascket.append(comment);
  }

  return commentBascket;
};

var blockComment = document.querySelector('.social__comments');
blockComment.append(createComments());


// Работа с фильтром для  загрузки фото
var uploadFile = document.querySelector('#upload-file');
var filterPopup = document.querySelector('.img-upload__overlay');

var openFilter = function () {
  preview.style.transform = 'scale(' + parseInt((scaleValue.value), 10) / 100 + ')';
  filterPopup.classList.remove('hidden');
  sliderBar.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeButtonFilter.addEventListener('click', closeFilter);
  document.addEventListener('keydown', closeFilter);
};

uploadFile.addEventListener('change', openFilter);

// Закритиые фильтра
var closeFilter = function (evt) {
  if (evt.key === 'Escape' || evt.button === 0) {
    filterPopup.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    scaleValue.value = 55 + '%';
    closeButtonFilter.removeEventListener('click', closeFilter);
    document.removeEventListener('keydown', closeFilter);
  }
};

var closeButtonFilter = document.querySelector('#upload-cancel');

// Работа с фильтром для зума
var scaleSize = filterPopup.querySelector('.img-upload__scale');
var scaleLowSize = scaleSize.querySelector('.scale__control--smaller');
var scaleBigSize = scaleSize.querySelector('.scale__control--bigger');
var scaleValue = scaleSize.querySelector('.scale__control--value');
var preview = document.querySelector('.img-upload__preview img');

scaleLowSize.addEventListener('click', function () {

  if (parseInt((scaleValue.value), 10) >= 50) {
    scaleValue.value = (parseInt((scaleValue.value), 10) - 25) + '%';
  } else {
    scaleValue.value = 25 + '%';
  }

  preview.style.transform = 'scale(' + parseInt((scaleValue.value), 10) / 100 + ')';
});

scaleBigSize.addEventListener('click', function () {

  if (parseInt((scaleValue.value), 10) <= 75) {
    scaleValue.value = (parseInt((scaleValue.value), 10) + 25) + '%';
  } else {
    scaleValue.value = 100 + '%';
  }

  preview.style.transform = 'scale(' + parseInt((scaleValue.value), 10) / 100 + ')';
});

// Работа с фильтрами

var changeFilterButton = document.querySelector('.effect-level__pin');
var effectRadio = document.querySelectorAll('.effects__radio');
var sliderBar = document.querySelector('.img-upload__effect-level');
var sliderLine = document.querySelector('.effect-level__line');

effectRadio.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    if (evt.target.value === 'none') {
      sliderBar.classList.add('hidden');
    } else {
      sliderBar.classList.remove('hidden');
    }
    preview.style.filter = '';
    preview.removeAttribute('class');
    preview.classList.add('effects__preview--' + item.value);
  });
});

changeFilterButton.addEventListener('mouseup', function () {
  if (preview.classList.contains('effects__preview--chrome')) {
    preview.style.filter = 'grayscale(' + (changeFilterButton.offsetLeft / sliderLine.offsetWidth) + ')';
  } else if (preview.classList.contains('effects__preview--sepia')) {
    preview.style.filter = 'sepia(' + (changeFilterButton.offsetLeft / sliderLine.offsetWidth) + ')';
  } else if (preview.classList.contains('effects__preview--marvin')) {
    preview.style.filter = 'invert(' + (changeFilterButton.offsetLeft / sliderLine.offsetWidth) + '%)';
  } else if (preview.classList.contains('effects__preview--phobos')) {
    preview.style.filter = 'blur(' + ((changeFilterButton.offsetLeft / sliderLine.offsetWidth) * 3) + 'px)';
  } else if (preview.classList.contains('effects__preview--heat')) {
    preview.style.filter = 'brightness(' + (1 + (changeFilterButton.offsetLeft / sliderLine.offsetWidth) * 2) + ')';
  }
});

