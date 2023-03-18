import { selectCurrentIngredient } from "../../../services/store/indgredients/IngredientsSlice";
import styles from "./styles.module.css";
import { IIngredient } from "../../../ts/interfaces/ingredient.interface";
import { ReactElement } from "react";
import { useAppSelector } from "../../../hooks/store";

function IngredientInfo(): ReactElement {
  const ingredient: IIngredient | undefined = useAppSelector(
    selectCurrentIngredient
  );
  if (!ingredient) {
    return <></>;
  }
  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default IngredientInfo;
