const ALERT_SHOW_TIME = 5000;

function getRandomPositiveNumber(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function checkStringLength(string, length) {
  return string.length <= length;
}

const setUniqueId = (min, max) => {
  const idArray = [];

  return function () {
    let currentValue = getRandomPositiveNumber(min, max);
    if (idArray.length >= max - min + 1) {
      console.error(
        "Перебраны все числа из указанного диапазона от " + min + " до " + max
      );
      return null;
    }

    while (idArray.includes(currentValue)) {
      currentValue = getRandomPositiveNumber(min, max);
    }

    idArray.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayIndex = (element) => {
  return element[getRandomPositiveNumber(0, element.length - 1)];
};

const showAlert = (message) => {
  const alertContainer = document.createElement("div");
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = "absolute";
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = "10px 3px";
  alertContainer.style.fontSize = "30px";
  alertContainer.style.textAlign = "center";
  alertContainer.style.backgroundColor = "red";

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomPositiveNumber, getRandomArrayIndex, setUniqueId, showAlert };
