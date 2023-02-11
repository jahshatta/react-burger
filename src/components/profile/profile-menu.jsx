import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const baseClassName = "text text_type_main-medium";

function ProfileMenu() {
  const linkClassName = ({ isActive }) => {
    return `${styles.link} ${baseClassName} ${
      isActive ? styles.active : "text_color_inactive"
    }`;
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.menu} mb-20`}>
        <NavLink to="" end className={linkClassName}>
          Профиль
        </NavLink>
        <NavLink to="orders" className={linkClassName}>
          История заказов
        </NavLink>
        <NavLink to="/logout" className={linkClassName}>
          Выход
        </NavLink>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Здесь вы можете изменить свои персональные данные
      </p>
    </div>
  );
}

export default ProfileMenu;
