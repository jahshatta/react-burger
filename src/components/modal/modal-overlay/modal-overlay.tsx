import styles from "./styles.module.css";
import { ReactElement } from "react";

interface IProps {
  onClose: () => void;
}

function ModalOverlay({ onClose }: IProps): ReactElement {
  return <div onClick={onClose} className={styles.overlay}></div>;
}

export default ModalOverlay;
