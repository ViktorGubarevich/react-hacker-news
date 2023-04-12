import { ArticleType } from "../../types/article-type";
import ArticleItem from "./ArticleItem";
import styles from "./ArticlesList.module.css";

interface ArticlesProps {
  articles: Array<ArticleType>;
}

const ArticlesList = ({ articles }: ArticlesProps) => (
  <ul className={styles.list}>
    {articles.map((article) => (
      <ArticleItem key={article.id} article={article} />
    ))}
  </ul>
);

export default ArticlesList;
