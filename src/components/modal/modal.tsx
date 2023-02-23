import ReactDOM from "react-dom";
import { ReactElement, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./styles.module.css";


const modalRoot = document.getElementById("modal") as Element;

interface IProps {
  title?: string;
  children: ReactElement;
  onClose: () => void;
}

function Modal({ title, children, onClose }: IProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
            <CloseIcon type="primary" onClick={onClose} />
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

export default Modal;
