import { useEffect, useState } from "react";

import useHttp from "../hooks/use-http";
import { getNews } from "../utils/firebase-api";

import ArticlesList from "../components/news/ArticlesList";
import NoArticlesFound from "../components/news/NoArticlesFound";
import Loader from "../components/UI/Loader";
import Button from "../components/UI/Button";

const News = () => {
  const {
    sendHttpRequest,
    status,
    data: loadedArticles,
    error,
  } = useHttp(getNews, true);

  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    sendHttpRequest();

    if (!timer) {
      const timerId = setInterval(sendHttpRequest, 60000) as unknown as number;
      setTimer(timerId);
    }    

    return () => {
      if (timer) clearInterval(timer);
    }; 
  }, [sendHttpRequest, timer]);

  if (status === "pending") {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedArticles || loadedArticles.length === 0)
  ) {
    return <NoArticlesFound />;
  }

  return (
    <>
      <Button onClick={sendHttpRequest}>Refresh</Button>
      <ArticlesList articles={loadedArticles} />
    </>
  );
};

export default News;
