import styles from "./styles.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, onClose }) {
  return (
    <div onClick={onClose} className={styles.overlay}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;
