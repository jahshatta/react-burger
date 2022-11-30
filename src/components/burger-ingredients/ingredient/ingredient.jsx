import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import IngredientType from "../../types/ingredient-type";

function Ingredient({ data }) {
  return (
    <div className={styles.card}>
      <img src={data.image} alt={data.name} className="pl-4 pr-4" />
      <div className={styles.price}>
        <span className="text text_type_digits-default mr-2">{data.price}</span>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default mt-4 mb-4">{data.name}</p>
    </div>
  );
}
Ingredient.propTypes = {
  data: IngredientType,
};
export default Ingredient;
