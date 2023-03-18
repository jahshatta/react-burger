import { IIngredient } from "../../ts/interfaces/ingredient.interface";
import styles from "./styles.module.css";
interface IngredientThumbProps {
  readonly image: Pick<IIngredient, "image">["image"];
  readonly zIndex?: number;
  readonly remaining?: number;
}

function IngredientThumb({
  image,
  zIndex,
  remaining,
  ...props
}: IngredientThumbProps) {
  return (
    <div
      className={styles.ingredientThumb}
      style={{ zIndex: zIndex }}
      {...props}
    >
      <img src={image} alt="test" />
      {remaining && remaining > 0 ? (
        <div
          className={`${styles.countMask} text text_type_digits-default`}
        >{`+${remaining}`}</div>
      ) : null}
    </div>
  );
}

export default IngredientThumb;
