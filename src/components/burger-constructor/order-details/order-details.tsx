import { ReactElement } from "react";
import { useAppSelector } from "../../../hooks/store";
import styles from "./styles.module.css";
import doneImg from "../../../images/done.png";
import { selectLastOrderNumber } from "../../../services/store/orders/OrdersSlice";
import Loader from "../../loader/Loader";

function OrderDetails(): ReactElement {
  const ordersStatus = useAppSelector((state) => state.orders.status);
  const number = useAppSelector(selectLastOrderNumber);
  if (ordersStatus === "loading") {
    return (
      <div>
        <Loader />
        {/* <p className="text text_type_main-default text_color_inactive">
          Оформляем заказ...
        </p> */}
      </div>
    );
  }
  if (ordersStatus === "failed") {
    return (
      <div>
        <p className="text text_type_main-default text_color_inactive">
          Упс. Кажется что-то пошло не так
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Попробуйте оформть заказ ещё раз
        </p>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.number} text text_type_digits-large mt-4 mb-8`}>
        {number}
      </h1>
      <p className="text text_type_main-medium">Идентификатор заказа</p>
      <img src={doneImg} alt="done" className={`${styles.image} mt-15 mb-15`} />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
