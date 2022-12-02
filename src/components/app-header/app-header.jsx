import Menu from "./menu/menu";
import styles from "./styles.module.css";

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <Menu />
    </header>
  );
}

export default AppHeader;
