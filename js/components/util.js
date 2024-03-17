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

export { getRandomPositiveNumber, getRandomArrayIndex, setUniqueId };
