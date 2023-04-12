import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getArticle } from "../utils/firebase-api";

import HighlightedArticle from "../components/news/HighlightedArticle";
import NoArticlesFound from "../components/news/NoArticlesFound";
import Loader from "../components/UI/Loader";
import Button from "../components/UI/Button";

const ArticleDetails = () => {
  const params = useParams();
  const { id } = params;

  const {
    sendHttpRequest,
    status,
    data: loadedArticle,
    error,
  } = useHttp(getArticle, true);

  useEffect(() => {
    sendHttpRequest(id);
  }, [sendHttpRequest, id]);

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
    (!loadedArticle || loadedArticle.length === 0)
  ) {
    return <NoArticlesFound />;
  }

  return (
    <>
      <div className="button-group">
        <NavLink to="/" className="button__come-back">
          Back to homepage
        </NavLink>
        <Button
          onClick={() => {
            sendHttpRequest(id);
          }}
        >
          Refresh
        </Button>
      </div>

      <HighlightedArticle article={loadedArticle} />
    </>
  );
};

export default ArticleDetails;
