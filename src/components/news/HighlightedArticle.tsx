import { Link } from "react-router-dom";

import { makeDateFormat } from "../../utils/date-format";
import { ArticleProps } from "./ArticleItem";
import CommentsList from "./CommentsList";
import styles from "./HighlightedArticle.module.css";

const HighlightedArticle = ({ article }: ArticleProps) => (
  <div className={styles.article}>
    <div className={styles["main-information"]}>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.date}>{makeDateFormat(article.time)}</p>
    </div>
    <Link to={article.url} className={styles.link} target="_blank">
      {article.url}
    </Link>
    <div className={styles.about}>
      <p>{article.score} points</p>
      <p className={styles.author}>By {article.by}</p>
      <p>{article.descendants} Comments</p>
    </div>
    {article.descendants > 0 ? (
      <CommentsList kids={article.kids} />
    ) : (
      <p className={styles["no-comments"]}>Comments list is empty</p>
    )}
  </div>
);

export default HighlightedArticle;
