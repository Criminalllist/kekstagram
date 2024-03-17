const bigPicture = document.querySelector(".big-picture");

const commentsList = document.querySelector(".social__comments");

const showBigPicture = ({ url, likes, comments, description }) => {
  bigPicture.classList.remove("hidden");
  document.body.classList.add("modal-open");
  bigPicture.querySelector(".big-picture__img img").src = url;
  bigPicture.querySelector(".likes-count").textContent = likes;
  bigPicture.querySelector(".comments-count").textContent = comments.length;
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

export { showBigPicture };
