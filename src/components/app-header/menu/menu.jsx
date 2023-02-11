import MenuItem from "./menu-item/menu-item";
import { Link } from "react-router-dom";
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
        <MenuItem Icon={BurgerIcon} text="Конструктор" path="/" />
        <MenuItem Icon={ListIcon} path="/profile/orders" text="Лента заказов" />
      </ul>
      <div className={styles.wrapper}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <ul className={`${styles.list} ${styles.profileMenu}`}>
        <MenuItem Icon={ProfileIcon} path="/profile" text="Личный кабинет" />
      </ul>
    </nav>
  );
}

export default Menu;
