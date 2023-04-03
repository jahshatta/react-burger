import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDrag } from "react-dnd";
import {
  setCurrentIngredient,
  selectIngredientCount,
} from "../../../services/store/indgredients/IngredientsSlice";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import IngredientType from "../../types/ingredient-type";
import { IIngredient } from "../../../ts/interfaces/ingredient.interface";
import { ReactElement } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/store";

interface IProps {
  data: IIngredient;
}

function Ingredient({ data }: IProps): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const count: number = useAppSelector((state) =>
    selectIngredientCount(state, data._id)
  );

  const [, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: data,
  }));

  return (
    <div className={`${styles.cardWrapper} ingredient`}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div
        ref={dragRef}
        className={styles.card}
        onClick={(): void => {
          dispatch(setCurrentIngredient(data._id));
          navigate(`/ingredients/${data._id}`, {
            state: {
              showModal: true,
            },
          });
        }}
      >
        <img src={data.image} alt={data.name} className="pl-4 pr-4" />
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">
            {data.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-4 mb-4">{data.name}</p>
      </div>
    </div>
  );
}
Ingredient.propTypes = {
  data: IngredientType.isRequired,
};
export default Ingredient;
