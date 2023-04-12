import { Link } from "react-router-dom";
import { ArticleType } from "../../types/article-type";

import { makeDateFormat } from "../../utils/date-format";
import styles from "./ArticleItem.module.css";

export interface ArticleProps {
  article: ArticleType;
}

const ArticleItem = ({ article }: ArticleProps) => (
  <Link className={styles.item} to={`/${article.id}`}>
    <li>
      {makeDateFormat(article.time)}
      <p className={styles.title}>{article.title}</p>
      <div className={styles.information}>
        <p>{article.score} points</p>
        <p className={styles.author}>By {article.by}</p>
        <p>{article.descendants} Comments</p>
      </div>
    </li>
  </Link>
);

export default ArticleItem;
