import { PropsWithChildren } from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
