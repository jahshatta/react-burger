import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentIngredient } from "../../../services/store/indgredients/IngredientsSlice";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import styles from "./styles.module.css";
import IngredientType from "../../types/ingredient-type";

function Ingredient({ data }) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <div
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
    </>
  );
}
Ingredient.propTypes = {
  data: IngredientType.isRequired,
};
export default Ingredient;
