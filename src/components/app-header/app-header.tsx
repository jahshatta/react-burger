import { ReactElement } from "react";
import Menu from "./menu/menu";
import styles from "./styles.module.css";

function AppHeader(): ReactElement {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <Menu />
    </header>
  );
}

export default AppHeader;
