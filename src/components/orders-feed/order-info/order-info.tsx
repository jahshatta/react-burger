import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { IIngredient } from "../../../ts/interfaces/ingredient.interface";
import { ReactElement, useMemo } from "react";
import { useAppSelector } from "../../../hooks/store";
import { RootState } from "../../../services/store/store";
import Ingredient from "./ingredient/Ingredient";
import { OrderWs } from "../../../ts/interfaces/types/orders-ws";

type OrderInfoProps = {
  data: OrderWs;
};
function OrderInfo({ data }: OrderInfoProps): ReactElement {
  const ingredients = useAppSelector((state: RootState) => {
    return state.ingredients.ingredients.filter((item: IIngredient) =>
      data.ingredients.includes(item._id)
    );
  });
  const countMap = useMemo(() => {
    const map: { [key: string]: number } = {};
    for (let i = 0; i < data.ingredients.length; i++) {
      const id = data.ingredients[i];
      if (map[id]) {
        map[id] += 1;
      } else {
        map[id] = 1;
      }
    }
    return map;
  }, [data.ingredients]);

  const sum = useMemo(
    () =>
      ingredients.reduce(
        (acc: number, current: IIngredient) => acc + current.price,
        0
      ),
    [ingredients]
  );

  if (!data) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-3">{data.name}</h2>
      <p className={`${styles.status} text text_type_main-default mb-15`}>
        {data.status}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.ingredientsList} custom-scroll mb-10 pr-3`}>
        {ingredients.map((item: IIngredient) => {
          return (
            <Ingredient data={item} key={item._id} count={countMap[item._id]} />
          );
        })}
      </div>
      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(data.createdAt)} />
        </span>
        <div className={`${styles.price}`}>
          <span className="text text_type_digits-default mr-2">{sum}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      {/* <div className={styles.nutrition}>
        <div
          className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
        >
          <span className="mb-2">Калории, ккал</span>
          <span className="text text_type_digits-default">
            {ingredient.calories}
          </span>
        </div>
        <div
          className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
        >
          <span className="mb-2">Белки, г</span>
          <span className="text text_type_digits-default">
            {ingredient.proteins}
          </span>
        </div>
        <div
          className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
        >
          <span className="mb-2">Жиры, г</span>
          <span className="text text_type_digits-default">
            {ingredient.fat}
          </span>
        </div>
        <div
          className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
        >
          <span className="mb-2">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </div>
      </div> */}
    </div>
  );
}

export default OrderInfo;
