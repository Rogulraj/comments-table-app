let isDateAscending = false;
let isAuthorAscending = false;
let isTextAscending = false;
let isLikeAscending = false;
let isReplyAscending = false;

export const dateSort = (array) => {
  isAuthorAscending = false;
  isTextAscending = false;
  isLikeAscending = false;
  isReplyAscending = false;

  if (isDateAscending === false) {
    isDateAscending = true;
    let result = array.sort((a, b) => new Date(a.at) - new Date(b.at));

    return result;
  } else {
    isDateAscending = false;

    return array.sort((a, b) => new Date(b.at) - new Date(a.at));
  }
};

export const authorSort = (array) => {
  isDateAscending = false;
  isTextAscending = false;
  isLikeAscending = false;
  isReplyAscending = false;

  if (isAuthorAscending === false) {
    isAuthorAscending = true;

    return array.sort((a, b) => a.author.localeCompare(b.author));
  } else {
    isAuthorAscending = false;

    return array.sort((a, b) => b.author.localeCompare(a.author));
  }
};

export const textSort = (array) => {
  isDateAscending = false;
  isAuthorAscending = false;
  isLikeAscending = false;
  isReplyAscending = false;

  if (isTextAscending === false) {
    isTextAscending = true;

    return array.sort((a, b) => a.text.localeCompare(b.text));
  } else {
    isTextAscending = false;

    return array.sort((a, b) => b.text.localeCompare(a.text));
  }
};

export const likeSort = (array) => {
  isDateAscending = false;
  isTextAscending = false;
  isAuthorAscending = false;
  isReplyAscending = false;

  if (isLikeAscending === false) {
    isLikeAscending = true;

    return array.sort((a, b) => a.like - b.like);
  } else {
    isLikeAscending = false;

    return array.sort((a, b) => b.like - a.like);
  }
};

export const replySort = (array) => {
  isDateAscending = false;
  isAuthorAscending = false;
  isTextAscending = false;
  isLikeAscending = false;

  if (isReplyAscending === false) {
    isReplyAscending = true;

    return array.sort((a, b) => a.reply - b.reply);
  } else {
    isReplyAscending = false;

    return array.sort((a, b) => b.reply - a.reply);
  }
};
