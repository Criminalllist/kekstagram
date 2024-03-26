import "./components/upload-images.js";
import "./components/upload-form.js";
import { createPictures } from "./components/upload-images.js";
import { setUserFormSumbit } from "./components/upload-form.js";
import { closePhotoEditor } from "./components/showFullPhoto.js";
import { getData } from "./components/api.js";

getData((photos) => {
  createPictures(photos);
});

setUserFormSumbit(closePhotoEditor);
