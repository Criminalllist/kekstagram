const getData = (onSuccess) => {
  fetch("https://25.javascript.htmlacademy.pro/kekstagram/data")
    .then((respone) => respone.json())
    .then((photos) => {
      onSuccess(photos);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch("https://25.javascript.htmlacademy.pro/kekstagram", {
    method: "POST",
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail("Не удалось отправить форму. Попробуйте ещё раз");
      }
    })
    .catch((err) => {
      console.error(err);
      onFail("Не удалось отправить форму. Попробуйте ещё раз");
    });
};

export { getData, sendData };
