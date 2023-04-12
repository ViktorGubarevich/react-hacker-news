import { useEffect, useState, useCallback } from "react";
import { FIREBASE_ROOT_DOMAIN_FAKE_NEWS } from "../../utils/firebase-api";
import Loader from "../UI/Loader";
import { KidsProps } from "./CommentsList";
import { CommentType } from "../../types/comment-type";
import styles from "./SubComment.module.css";

const SubCommentsList = ({ kids }: KidsProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJokesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const comment = await Promise.all(
        kids.map((commentId) => {
          return fetch(
            `${FIREBASE_ROOT_DOMAIN_FAKE_NEWS}/item/${commentId}.json?print=pretty`
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
    fetchJokesHandler();
  }, [fetchJokesHandler]);

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
      {comments.map((text) => {
        return (
          <div
            key={text.id}
            className={styles.items}
            dangerouslySetInnerHTML={{ __html: text.text }}
          />
        );
      })}
    </>
  );
};

export default SubCommentsList;
