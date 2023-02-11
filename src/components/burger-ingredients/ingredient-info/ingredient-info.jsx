import { useSelector } from "react-redux";
import { selectCurrentIngredient } from "../../../services/store/indgredients/IngredientsSlice";
import styles from "./styles.module.css";

function IngredientInfo() {
  const ingredient = useSelector(selectCurrentIngredient);
  if(!ingredient) {
    return null
  }
  return (
    <>
      <img
        alt={ingredient.name}
        src={ingredient.image_large}
        className="mb-4"
      ></img>
      <h2 className="text text_type_main-medium mb-8">{ingredient.name}</h2>
      <div className={styles.nutrition}>
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
      </div>
    </>
  );
}

export default IngredientInfo;
