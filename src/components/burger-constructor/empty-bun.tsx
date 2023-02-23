import { ReactElement } from "react";
import styles from "./styles.module.css";

interface IProps {
  type: "top" | "bottom";
}
function EmptyBun({ type }: IProps): ReactElement {
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

export default EmptyBun;
