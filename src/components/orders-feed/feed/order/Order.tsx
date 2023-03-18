import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "./ingredients-list/IngredientsList";
import styles from "./styles.module.css";
import { OrderWs } from "../../../../ts/interfaces/types/orders-ws";

type Props = {
  data: OrderWs;
  onClick?: () => void;
};

function Order({ data, onClick }: Props) {
  return (
    <div className={`${styles.card} p-6`} onClick={onClick}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">{`#${data.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(data.createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium pt-6 pb-6">{data.name}</p>
      <IngredientsList ids={data.ingredients} />
    </div>
  );
}

export default Order;
