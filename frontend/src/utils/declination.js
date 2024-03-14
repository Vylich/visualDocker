const createWordGetter = (singular, plural1, plural2, plural3) => (count) => {
  if (count === 1) {
    return singular;
  } else if (count % 10 === 1 && count !== 11) {
    return singular;
  } else if (count % 100 === 12 || count % 100 === 13 || count % 100 === 14 || count % 10 === 5) {
		return plural2;
	} else if (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) {
    return plural1;
  } else {
    return plural2;
  }
};

export const getCommentWord = createWordGetter("комментарий", "комментария", "комментариев");
export const getLikesWord = createWordGetter("лайк", "лайка", "лайков");
export const getFollowerWord = createWordGetter("подписчик", "подписчика", "подписчиков");
export const getSubscriptionsWord = createWordGetter("подписка", "подписки", "подписок");
export const getPostsWord = createWordGetter("пост", "поста", "постов");
export const getViewsWord = createWordGetter("просмотр", "просмотра", "просмотров");
export const getAnswerWord = createWordGetter("ответ", "ответа", "ответов");