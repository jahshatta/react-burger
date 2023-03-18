import IngredientThumb from "../../../ingredient-thumb/IngredientThumb";
import { useAppSelector } from "../../../../hooks/store";
import { IIngredient } from "../../../../ts/interfaces/ingredient.interface";
import styles from "./styles.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  data: IIngredient;
  count: number;
};

function Ingredient({ data, count }: Props) {
  const price = useAppSelector((state) => {
    const ingredient = state.ingredients.ingredients.find(
      (item) => item._id === data._id
    );
    return ingredient?.price;
  });
  return (
    <div className={styles.container}>
      <IngredientThumb image={data.image} />
      <span className="pl-4 pr-4">{data.name}</span>
      <span className={styles.price}>
        <span className="mr-2">{`${count} x ${price}`}</span>
        <CurrencyIcon type="primary" />
      </span>
    </div>
  );
}

export default Ingredient;
