import { createPhoto } from "./data.js";
import { showBigPicture } from "./showFullPhoto.js";

const pictureContainer = document.querySelector(".pictures");
const templateItem = document
  .querySelector("#picture")
  .content.querySelector(".picture");

const pictureList = createPhoto(25);

pictureList.forEach(({ url, likes, comments, description }) => {
  const pictureElement = templateItem.cloneNode(true);
  pictureElement.querySelector(".picture__img").src = url;
  pictureElement.querySelector(".picture__likes").textContent = likes;
  pictureElement.querySelector(".picture__comments").textContent =
    comments.length;

  pictureElement.addEventListener("click", (evt) => {
    evt.preventDefault();
    showBigPicture({ url, likes, comments, description });
  });

  pictureContainer.append(pictureElement);
});
