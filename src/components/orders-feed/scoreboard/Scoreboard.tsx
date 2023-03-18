import { useMemo } from "react";
import { useAppSelector } from "../../../hooks/store";
import styles from "./styles.module.css";
import { OrderWs } from "../../../ts/interfaces/types/orders-ws";

function Scoreboard() {
  const orders = useAppSelector((state) => state.ordersWs.orders);
  const total = useAppSelector((state) => state.ordersWs.total);
  const totalToday = useAppSelector((state) => state.ordersWs.totalToday);

  type GroupedByStatus = {
    [K in OrderWs["status"]]?: OrderWs[];
  };
  const groupedByStatus = useMemo<GroupedByStatus>(() => {
    return orders.reduce((group: GroupedByStatus, order: OrderWs) => {
      const { status } = order;
      group[status] = group[status] ?? [];
      group[status]?.push(order);
      return group;
    }, {});
  }, [orders]);
  const { done, pending } = groupedByStatus;

  return (
    <section className={`${styles.section} pt-25 pb-10`}>
      <div className={`${styles.queue}`}>
        <div className={`${styles.done}`}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={`${styles.numbersList} custom-scroll`}>
            {done?.map((item) => (
              <p
                key={item._id}
                className={`text text_type_digits-default ${styles.numberDone}`}
              >
                {item.number}
              </p>
            ))}
          </div>
        </div>
        <div className={`${styles.pending}`}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={`${styles.numbersList} custom-scroll`}>
            {pending?.map((item) => (
              <p key={item._id} className="text text_type_digits-default">
                {item.number}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.total}>
        <p className="text text_type_main-medium">Выполнено за всё время:</p>
        <p className={`${styles.glow} text text_type_digits-large`}>{total}</p>
      </div>
      <div className={styles.todayTotal}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.glow} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </section>
  );
}

export default Scoreboard;
