import { useState } from "react";

import SubCommentsList from "./SubCommentsList";
import styles from "./Comments.module.css";
import arrow from "../images/angle-arrow-down.svg";
import { CommentType } from "../../types/comment-type";

export interface CommentProps {
  comment: CommentType;
}

const Comments = ({ comment }: CommentProps) => {
  const [clicked, setCliked] = useState(false);

  const handleClick = () => {
    comment.kids && setCliked((clicked) => !clicked);
  };

  return (
    <>
      <div className={styles.wrap} onClick={handleClick}>
        <div
          className={styles["first-items"]}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
        {comment.kids && (
          <img
            src={arrow}
            width="20"
            className={styles.arrow}
            alt="arrow-down"
          />
        )}
      </div>
      {comment.kids && clicked && <SubCommentsList kids={comment.kids} />}
    </>
  );
};

export default Comments;
