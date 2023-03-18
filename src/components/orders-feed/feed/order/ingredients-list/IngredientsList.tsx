import { useMemo } from "react";
import { useAppSelector } from "../../../../../hooks/store";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import IngredientThumb from "../../../ingredients-list/IngredientThumb";
import { IIngredient } from "../../../../../ts/interfaces/ingredient.interface";
import IngredientThumb from "../../../../ingredient-thumb/IngredientThumb";
import styles from "./styles.module.css";
import { RootState } from "../../../../../services/store/store";

interface IngredientsListProps {
  readonly ids: Pick<IIngredient, "_id">["_id"][];
  showLimit?: number;
}

function IngredientsList({ ids, showLimit = 6 }: IngredientsListProps) {
  const ingredients = useAppSelector((state: RootState) => {
    return state.ingredients.ingredients.filter((item: IIngredient) =>
      ids.includes(item._id)
    );
  });
  const limitedList = useMemo(() => {
    const listArray = ingredients.slice(0, showLimit);
    const remaining = ingredients.length - showLimit;
    const list = listArray.map((item: IIngredient, index: number) => {
      const isLast: boolean = index + 1 === listArray.length;
      return (
        <IngredientThumb
          image={item.image}
          zIndex={listArray.length - index}
          key={index}
          remaining={isLast && remaining ? remaining : 0}
        />
      );
    });

    return list;
  }, [ingredients, showLimit]);

  const sum = useMemo(
    () =>
      ingredients.reduce(
        (acc: number, current: IIngredient) => acc + current.price,
        0
      ),
    [ingredients]
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>{limitedList}</div>
      {/* TODO: Вынести цену с валютой в отдельный компонент */}
      <div className={`${styles.price}`}>
        <span className="text text_type_digits-default mr-2">{sum}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export default IngredientsList;
