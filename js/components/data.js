import {
  getRandomPositiveNumber,
  getRandomArrayIndex,
  setUniqueId,
} from "./util.js";

const NAMES = [
  "Huanito",
  "Egor",
  "Oleg",
  "George",
  "Svetlana",
  "Ekaterina",
  "Kirill",
  "Jhone",
  "Sam",
  "Din",
  "Eddard",
  "Avraam",
];

const DESCRIPTION = [
  "«Иметь мягкое сердце в жестоком мире — это сила, а не слабость».",
  "«Смысл жизни состоит в том, чтобы умереть молодым ... как можно позже».",
  "«Отдыхайте так, чтобы вы забывали брать телефон в руки».",
  "«У вас никогда не заканчиваются вещи, которые могут пойти не так».",
  "«Пятница — мое второе любимое слово».",
  "«Каждый день может быть не очень хорошим, но в каждом дне есть хорошее».",
  "«Будьте тем человеком, с которым вы хотите провести всю жизнь»",
];

const MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const cardId = setUniqueId(1, 25);
const imageId = setUniqueId(1, 25);
const commentId = setUniqueId(1, 200);

const photoCards = () => {
  return {
    id: cardId(),
    url: `photos/${imageId()}.jpg`,
    description: getRandomArrayIndex(DESCRIPTION),
    likes: getRandomPositiveNumber(1, 200),
    comments: addComment(),
  };
};

const createComment = () => {
  return {
    id: commentId(),
    avatar: `img/avatar-${getRandomPositiveNumber(1, 6)}.svg`,
    message: getRandomArrayIndex(MESSAGES),
    name: getRandomArrayIndex(NAMES),
  };
};

const addComment = () => {
  const commentsList = [];
  for (let i = 0; i < getRandomPositiveNumber(1, 5); i++) {
    commentsList[i] = createComment();
  }
  return commentsList;
};

const createPhoto = (count) => {
  return Array.from({ length: count }, photoCards);
};

export { createPhoto };
