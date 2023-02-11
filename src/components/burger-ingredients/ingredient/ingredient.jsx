import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

function Ingredient({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => selectIngredientCount(state, data._id));

  const [, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: data,
  }));

  return (
    <div className={styles.cardWrapper}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div
        ref={dragRef}
        className={styles.card}
        onClick={() => {
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
          <CurrencyIcon />
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
