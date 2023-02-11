import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const baseClassName = "text text_type_main-default";
function MenuItem({ Icon, text, isActive, path }) {
  const linkClassName = ({ isActive }) => {
    return `${styles.link} ${baseClassName} ${
      isActive ? '': "text_color_inactive"
    }`;
  };

  return (
    <li
      className={`${styles.item} pt-4 pr-5 pb-4 pl-5`}
    >
      <NavLink to={path} className={linkClassName}>
        <Icon type={isActive ? "primary" : "secondary"} />
        <span className="ml-2">{text}</span>
      </NavLink>
    </li>
  );
}

MenuItem.propTypes = {
  Icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

export default MenuItem;
