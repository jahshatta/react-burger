import styles from "./styles.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onClose }) {
  return <div onClick={onClose} className={styles.overlay}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;
