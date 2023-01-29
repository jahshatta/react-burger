import PropTypes from "prop-types";
import styles from "./styles.module.css";

function EmptyBun({ type }) {
  return (
    <div
      className={`${styles.emptyBun} ${
        type === "top" ? styles.topBun : styles.bottomBun
      } pl-6 pr-6 pb-4 pt-4`}
    >
      <p className="text text_type_main-default text_color_inactive">
        Выберите булку
      </p>
    </div>
  );
}

EmptyBun.propTypes = {
  type: PropTypes.oneOf(["top", "bottom"]).isRequired,
};
export default EmptyBun;
