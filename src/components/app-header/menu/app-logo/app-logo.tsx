import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactElement } from "react";
import styles from "./styles.module.css";

function AppLogo(): ReactElement {
  return (
    <div className={styles.wrapper}>
      <a href="/">
        <Logo />
      </a>
    </div>
  );
}

export default AppLogo;
