function resizePhoto(imagePreview) {
  const smallToggler = document.querySelector(".scale__control--smaller");
  const bigToggler = document.querySelector(".scale__control--bigger");
  let scaleValue = document.querySelector(".scale__control--value");

  let counter = 100;
  scaleValue.value = counter + "%";
  imagePreview.style.transform = `scale(${counter / 100})`;

  function reduceImage() {
    if (counter > 25) {
      scaleValue.value = counter - 25 + "%";
      imagePreview.style.transform = `scale(${
        parseInt(scaleValue.value) / 100
      })`;
      counter -= 25;
    }
  }

  function increaseImage() {
    if (parseInt(scaleValue.value) < 100) {
      sscaleValue.value = counter + 25 + "%";
      imagePreview.style.transform = `scale(${
        parseInt(scaleValue.value) / 100
      })`;
      counter += 25;
    }
  }

  smallToggler.addEventListener("click", reduceImage);
  bigToggler.addEventListener("click", increaseImage);
}

function addFilter(imagePreview) {
  const sliderElement = document.querySelector(".effect-level__slider");
  const valueElement = document.querySelector(".effect-level__value");
  const specialsElements = document.querySelectorAll(".effects__radio");

  if (sliderElement && sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: "lower",
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on("update", () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });

  specialsElements.forEach((element) => {
    imagePreview.classList.add("effects__preview--none");
    sliderElement.classList.add("hidden");
    imagePreview.style.filter = "none";
    element.addEventListener("change", (evt) => {
      if (evt.target.checked) {
        if (evt.target.value === "chrome") {
          imagePreview.classList.add("effects__preview--chrome");
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });

          sliderElement.noUiSlider.on("update", () => {
            valueElement.value = sliderElement.noUiSlider.get();
            imagePreview.style.filter = `grayscale(${valueElement.value})`;
          });
        } else {
          imagePreview.classList.remove("effects__preview--chrome");
        }

        if (evt.target.value === "sepia") {
          imagePreview.classList.add("effects__preview--sepia");
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });

          sliderElement.noUiSlider.on("update", () => {
            valueElement.value = sliderElement.noUiSlider.get();
            imagePreview.style.filter = `sepia(${valueElement.value})`;
          });
        } else {
          imagePreview.classList.remove("effects__preview--sepia");
        }

        if (evt.target.value === "marvin") {
          imagePreview.classList.add("effects__preview--marvin");
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });

          sliderElement.noUiSlider.on("update", () => {
            valueElement.value = sliderElement.noUiSlider.get();
            imagePreview.style.filter = `invert(${valueElement.value + "%"})`;
          });
        } else {
          imagePreview.classList.remove("effects__preview--marvin");
        }

        if (evt.target.value === "phobos") {
          imagePreview.classList.add("effects__preview--phobos");
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });

          sliderElement.noUiSlider.on("update", () => {
            valueElement.value = sliderElement.noUiSlider.get();
            imagePreview.style.filter = `blur(${valueElement.value + "px"})`;
          });
        } else {
          imagePreview.classList.remove("effects__preview--phobos");
        }

        if (evt.target.value === "heat") {
          imagePreview.classList.add("effects__preview--heat");
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });

          sliderElement.noUiSlider.on("update", () => {
            valueElement.value = sliderElement.noUiSlider.get();
            imagePreview.style.filter = `brightness(${valueElement.value})`;
          });
        } else {
          imagePreview.classList.remove("effects__preview--heat");
        }

        if (evt.target.value === "none") {
          imagePreview.classList.add("effects__preview--none");
          sliderElement.classList.add("hidden");
          imagePreview.style.filter = "none";
        } else {
          sliderElement.classList.remove("hidden");

          imagePreview.classList.remove("effects__preview--none");
        }
      }
    });
  });
}

export { resizePhoto, addFilter };
