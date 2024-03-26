const bigPicture = document.querySelector(".big-picture");
const commentsList = document.querySelector(".social__comments");
const commentsCount = document.querySelector(".social__comment-count");

const showMoreComments = document.querySelector(".social__comments-loader");

const showBigPicture = ({ url, likes, comments, description }) => {
  bigPicture.classList.remove("hidden");
  document.body.classList.add("modal-open");
  bigPicture.querySelector(".big-picture__img img").src = url;
  bigPicture.querySelector(".likes-count").textContent = likes;
  bigPicture.querySelector(".social__caption").textContent = description;

  commentsList.innerHTML = "";
  comments.forEach((comment) => {
    commentsList.insertAdjacentHTML(
      "afterbegin",
      `<li class="social__comment">
    <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
    <p class="social__text">${comment.message}</p>
</li>`
    );
  });
  updateUserComment();
  closeModal();
};

const closeModal = () => {
  const closeButton = bigPicture.querySelector(".cancel");
  closeButton.addEventListener("click", () => {
    bigPicture.classList.add("hidden");
    document.body.classList.remove("modal-open");
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      bigPicture.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
  });
};

function closePhotoEditor() {
  bigPicture.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.querySelector(".img-upload__overlay").classList.add("hidden");
  document.querySelector(".img-upload__input ").value = "";
  document.querySelector(".scale__control--value").value = "100%";
}

function updateUserComment() {
  const commentsItems = commentsList.querySelectorAll(".social__comment");

  commentsItems.forEach((item, i) => {
    if (i > 4) {
      item.classList.add("hidden");
    }
  });

  let commentCounter;

  if (commentsItems.length < 5) {
    commentCounter = commentsItems.length;
    showMoreComments.classList.add("hidden");
  } else {
    showMoreComments.classList.remove("hidden");
    commentCounter = 5;
  }

  commentsCount.textContent = `${commentCounter} из ${commentsItems.length} комментариев`;

  let showMore = function () {
    commentCounter +=
      commentsItems.length - commentCounter > 5
        ? 5
        : commentsItems.length - commentCounter;

    commentsCount.textContent = `${commentCounter} из ${commentsItems.length} комментариев`;

    for (let i = 0; i < commentCounter; i++) {
      commentsItems[i].classList.remove("hidden");
      if (commentCounter === commentsItems.length) {
        showMoreComments.classList.add("hidden");
        showMoreComments.removeEventListener("click", showMore);
      }
    }
  };

  showMoreComments.addEventListener("click", showMore);
}

export { showBigPicture, closePhotoEditor };
