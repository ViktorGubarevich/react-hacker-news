import { useEffect, useState, useCallback } from "react";

import Comments from "./Comments";
import Loader from "../UI/Loader";
import styles from "./CommentsList.module.css";
import { FIREBASE_ROOT_DOMAIN_FAKE_NEWS } from "../../utils/firebase-api";
import { ArticleType } from "../../types/article-type";
import { CommentType } from "../../types/comment-type";

export interface KidsProps {
  kids: ArticleType["kids"];
}

const CommentsList = ({ kids }: KidsProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFakeNewsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const comment = await Promise.all(
        kids.map((childId) => {
          return fetch(
            `${FIREBASE_ROOT_DOMAIN_FAKE_NEWS}/item/${childId}.json?print=pretty`
          ).then((data) => data.json());
        })
      );

      setComments(comment);
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";

      if (error instanceof Error) {
        setError(errorMessage);
      }
    }
    setIsLoading(false);
  }, [kids]);

  useEffect(() => {
    fetchFakeNewsHandler();
  }, [fetchFakeNewsHandler]);

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (isLoading) {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.comments}>
        <h4 className={styles.title}>Comments</h4>
        {comments &&
          comments.map((comment) => {
            return <Comments key={comment.id} comment={comment} />;
          })}
      </div>
    </>
  );
};

export default CommentsList;
