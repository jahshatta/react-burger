import styles from "./styles.module.css";

function IngredientInfo({ data }) {
  return (
    <>
      <img alt={data.name} src={data.image_large} className="mb-4"></img>
      <h2 className="text text_type_main-medium mb-8">{data.name}</h2>
      <div className={styles.nutrition}>
        <div
          className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
        >
          <span className="mb-2">Калории, ккал</span>
          <span className="text text_type_digits-default">{data.calories}</span>
        </div>
        <div
          className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
        >
          <span className="mb-2">Белки, г</span>
          <span className="text text_type_digits-default">{data.proteins}</span>
        </div>
        <div
          className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
        >
          <span className="mb-2">Жиры, г</span>
          <span className="text text_type_digits-default">{data.fat}</span>
        </div>
        <div
          className={`${styles.nutrient} text text_type_main-default text_color_inactive`}
        >
          <span className="mb-2">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {data.carbohydrates}
          </span>
        </div>
      </div>
    </>
  );
}

export default IngredientInfo;
