import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

function AppLogo() {
  return (
    <div className={styles.wrapper}>
      <a href="/">
        <Logo />
      </a>
    </div>
  );
}

export default AppLogo;
