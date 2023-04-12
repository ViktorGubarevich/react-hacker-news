import { PropsWithChildren } from "react";
import styles from "./Card.module.css";

const Card = ({ children }: PropsWithChildren) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
