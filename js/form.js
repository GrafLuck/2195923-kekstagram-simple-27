const body = document.querySelector('body');
const photoUploadButton = document.querySelector('#upload-file');

const photoEditForm = document.querySelector('.img-upload__overlay');
const cancelFormButton = photoEditForm.querySelector('#upload-cancel');
const scalePhotoText = photoEditForm.querySelector('.scale__control--value');
const previewPhotoImg = photoEditForm.querySelector('.img-upload__preview img');
const descriptionPhotoText = photoEditForm.querySelector('.text__description');

const zoomOutPhotoButton = photoEditForm.querySelector('.scale__control--smaller');
const zoomInPhotoButton = photoEditForm.querySelector('.scale__control--bigger');

const effectsList = photoEditForm.querySelector('.effects__list');

const replaceClass = (newClass) => {
  previewPhotoImg.classList.remove(previewPhotoImg.classList.value);
  previewPhotoImg.classList.add(newClass);
};

const resetFormData = () => {
  photoUploadButton.value = '';
  scalePhotoText.value = '100%';
  previewPhotoImg.style.transform = 'scale(1)';
  replaceClass('effects__preview--none');
  descriptionPhotoText.textContent = '';
};

const onModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onCancelFormButtonClick();
  }
};

function onUploadPhotoButtonChange() {
  photoEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  cancelFormButton.addEventListener('click', onCancelFormButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
  photoUploadButton.removeEventListener('change', onUploadPhotoButtonChange);
}

function onCancelFormButtonClick() {
  photoEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  resetFormData();
  cancelFormButton.removeEventListener('click', onCancelFormButtonClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
}

const createEventFormHandlers = () => {
  photoUploadButton.addEventListener('change', onUploadPhotoButtonChange);
};

zoomOutPhotoButton.addEventListener('click', () => {
  const scalePhotoInteger = parseInt(scalePhotoText.value, 10);
  if (scalePhotoInteger > 25) {
    scalePhotoText.value = `${scalePhotoInteger - 25}%`;
    previewPhotoImg.style.transform = `scale(${(scalePhotoInteger - 25) / 100})`;
  }
});

zoomInPhotoButton.addEventListener('click', () => {
  const scalePhotoInteger = parseInt(scalePhotoText.value, 10);
  if (scalePhotoInteger < 100) {
    scalePhotoText.value = `${scalePhotoInteger + 25}%`;
    previewPhotoImg.style.transform = `scale(${(scalePhotoInteger + 25) / 100})`;
  }
});

effectsList.addEventListener('change', (evt) => {
  const idEffect = evt.target.id;
  switch(idEffect) {
    case 'effect-none':
      replaceClass('effects__preview--none');
      break;
    case 'effect-chrome':
      replaceClass('effects__preview--chrome');
      break;
    case 'effect-sepia':
      replaceClass('effects__preview--sepia');
      break;
    case 'effect-marvin':
      replaceClass('effects__preview--marvin');
      break;
    case 'effect-phobos':
      replaceClass('effects__preview--phobos');
      break;
    case 'effect-heat':
      replaceClass('effects__preview--heat');
      break;
  }
});

export {createEventFormHandlers};
