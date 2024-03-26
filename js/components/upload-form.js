import { sendData } from "./api.js";
import { addFilter, resizePhoto } from "./photo-editor.js";

import { showAlert } from "./util.js";

const uploadImageForm = document.querySelector(".img-upload__form");
const overlay = document.querySelector(".img-upload__overlay");
const uploadField = uploadImageForm.querySelector(".img-upload__input");
const previewImage = uploadImageForm.querySelector(".img-upload__preview img");
const closeFormButton = uploadImageForm.querySelector(".img-upload__cancel");
const commentField = uploadImageForm.querySelector(".text__description");
const hashField = uploadImageForm.querySelector(".text__hashtags");
const submitButton = uploadImageForm.querySelector(".img-upload__submit");

uploadField.addEventListener("change", (evt) => {
  overlay.classList.remove("hidden");
  document.body.classList.add("modal-open");
  // uploadImage(evt);
  resizePhoto(previewImage);
  addFilter(previewImage);

  document.addEventListener("keydown", (evt) => {
    if (
      evt.key === "Escape" &&
      evt.target != commentField &&
      evt.target != hashField
    ) {
      overlay.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
  });
});

closeFormButton.addEventListener("click", () => {
  overlay.classList.add("hidden");
  document.body.classList.remove("modal-open");
  uploadField.value = "";
});

const pristine = new Pristine(uploadImageForm, {
  classTo: "img-upload__text",
  errorTextParent: "img-upload__text",
  errorTextClass: "img-upload__error",
});

const hashRegular = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const validateTags = (value) => {
  const tagsList = value.toLowerCase().split(" ");
  const newList = new Set(tagsList);

  if (value === "") {
    return true;
  }

  if (tagsList.length !== newList.size) {
    return false;
  }

  if (tagsList.length > newList.length) {
    return false;
  }
  return tagsList.every((tag) => hashRegular.test(tag));
};

pristine.addValidator(hashField, validateTags, "Неправильно заполнены хэштеги");

// let uploadImage = function (evt) {
//   let imageTarget = evt.target;

//   if (!FileReader) {
//     alert("FileReader не поддерживается — облом");
//     return;
//   }

//   if (!imageTarget.files.length) {
//     alert("Ничего не загружено");
//     return;
//   }

//   let reader = new FileReader();
//   reader.onload = function () {
//     previewImage.src = reader.result;
//   };

//   reader.readAsDataURL(imageTarget.files[0]);
// };

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = "Сохраняю...";
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = "Сохранить";
};

const successSend = () => {
  uploadField.value = "";
  previewImage.style.transform = `scale(1)`;
  document.querySelector(".scale__control--value").value = 100 + "%";
  commentField.value = "";
  hashField.value = "";
};

const setUserFormSumbit = (onSuccess) => {
  uploadImageForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          successSend();
          onSuccess();
        },
        () => {
          showAlert("Не удалось отправить форму. Попробуйте ещё раз");
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};
export { setUserFormSumbit };
