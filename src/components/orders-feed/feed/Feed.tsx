import Order from "./order/Order";
import { useAppSelector } from "../../../hooks/store";
import { OrderWs } from "../../../ts/interfaces/types/orders-ws";
import styles from "./styles.module.css";

type FeedProps = {
  goToPage: (number: number) => void;
};

function Feed({ goToPage }: FeedProps) {
  const orders = useAppSelector((state) => state.ordersWs.orders);
  return (
    <section className={`${styles.feed} pr-2 custom-scroll`}>
      {orders.map((order: OrderWs) => (
        <Order
          data={order}
          key={order.number}
          onClick={(): void => {
            goToPage(order.number);
          }}
        />
      ))}
    </section>
  );
}

export default Feed;
