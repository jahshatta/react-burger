import MenuItem from "./menu-item/menu-item";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

function Menu() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <MenuItem Icon={BurgerIcon} text="Конструктор" isActive />
        <MenuItem Icon={ListIcon} text="Лента заказов" />
      </ul>
      <div className={styles.wrapper}>
        <a href="/">
          <Logo />
        </a>
      </div>
      <ul className={`${styles.list} ${styles.profileMenu}`}>
        <MenuItem Icon={ProfileIcon} text="Личный кабинет" />
      </ul>
    </nav>
  );
}

export default Menu;
