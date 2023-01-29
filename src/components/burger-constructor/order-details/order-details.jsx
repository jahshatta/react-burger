import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import doneImg from "../../../images/done.png";
import { selectLastOrderNumber } from "../../../services/store/orders/OrdersSlice";

function OrderDetails() {
  const ordersStatus = useSelector((state) => state.orders.status);
  const number = useSelector(selectLastOrderNumber);
  if (ordersStatus === "loading") {
    return (
      <div>
        <p className="text text_type_main-default text_color_inactive">
          Оформляем заказ...
        </p>
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
    <>
      <h1 className={`${styles.number} text text_type_digits-large mt-4 mb-8`}>
        {number}
      </h1>
      <p className="text text_type_main-medium">Идентификатор заказа</p>
      <img src={doneImg} alt="done" className="mt-15 mb-15" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;
