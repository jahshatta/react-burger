import { useState } from "react";
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
import Modal from "../../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import styles from "./styles.module.css";
import IngredientType from "../../types/ingredient-type";

function Ingredient({ data }) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
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
          setModalIsVisible(true);
          dispatch(setCurrentIngredient(data._id));
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
      {modalIsVisible && (
        <Modal
          title="Детали ингредиента"
          onClose={() => {
            setModalIsVisible(false);
          }}
        >
          <IngredientInfo />
        </Modal>
      )}
    </div>
  );
}
Ingredient.propTypes = {
  data: IngredientType.isRequired,
};
export default Ingredient;
