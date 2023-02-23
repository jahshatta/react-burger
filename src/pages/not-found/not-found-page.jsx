import img from "../../images/404.png";
import styles from "./notfound.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={img} alt="Page not found" />
      <p className="text text_type_digits-large">404</p>
    </div>
  );
}

export default NotFoundPage;
