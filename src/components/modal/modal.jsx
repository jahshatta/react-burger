import ReactDOM from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

function Modal({ title, children, onClose }) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div
        className={`${styles.modal} p-10`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className={`${styles.header} pt-4 pb-4`}>
          <h1 className={`${styles.title} text text_type_main-large pr-5`}>
            {title}
          </h1>
          <div className={styles.close}>
            <CloseIcon onClick={onClose} />
          </div>
        </header>
        <section className={`${styles.body} pl-15 pr-15 pb-4`}>
          {children}
        </section>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
