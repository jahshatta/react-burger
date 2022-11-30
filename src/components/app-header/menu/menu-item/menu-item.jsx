import styles from "./styles.module.css";
import PropTypes from "prop-types";

function MenuItem({ Icon, text, isActive }) {
  return (
    <li
      className={`${styles.item}  text text_type_main-default ${
        !isActive && "text_color_inactive"
      } pt-4 pr-5 pb-4 pl-5`}
    >
      <a href="#" className={styles.link}>
        <Icon type={isActive ? "primary" : "secondary"} />
        <span className="ml-2">{text}</span>
      </a>
    </li>
  );
}

MenuItem.propTypes = {
  Icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default MenuItem;
