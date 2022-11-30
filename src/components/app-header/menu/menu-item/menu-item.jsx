import styles from "./styles.module.css";
import PropTypes from "prop-types";

function MenuItem({ Icon, text, isActive }) {
  return (
    <li className={`${styles.item} pt-4 pr-5 pb-4 pl-5`}>
      <Icon type={isActive ? "primary" : "secondary"} />
      <span
        className={`text text_type_main-default ${
          !isActive && "text_color_inactive"
        } ml-2`}
      >
        {text}
      </span>
    </li>
  );
}

MenuItem.propTypes = {
  Icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default MenuItem;
