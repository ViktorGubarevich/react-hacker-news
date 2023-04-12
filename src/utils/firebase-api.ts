export const FIREBASE_ROOT_DOMAIN_FAKE_NEWS =
  "https://hacker-news.firebaseio.com/v0";

export async function getNews() {
  const numberOfNews = 100;

  const articleIds = await fetch(
    `${FIREBASE_ROOT_DOMAIN_FAKE_NEWS}/newstories.json?print=pretty&orderBy="$key"&limitToFirst=${numberOfNews}`
  ).then((data) => data.json());

  const articles = await Promise.all(
    articleIds.map((articleId: string) => {
      return fetch(
        `${FIREBASE_ROOT_DOMAIN_FAKE_NEWS}/item/${articleId}.json`
      ).then((data) => data.json());
    })
  );

  return articles;
}

export async function getArticle(articleId: string) {
  const article = await fetch(
    `${FIREBASE_ROOT_DOMAIN_FAKE_NEWS}/item/${articleId}.json`
  ).then((data) => data.json());

  return article;
}
