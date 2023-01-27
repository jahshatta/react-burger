import { useState, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredient/ingredient";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import IngredientType from "../types/ingredient-type";

const typesTitleMap = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState("bun");

  const refsMap = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
  };
  const groupedIngredients = useMemo(() => {
    return data.reduce((group, ingredient) => {
      const { type } = ingredient;
      group[type] = group[type] ?? [];
      group[type].push(ingredient);
      return group;
    }, {});
  }, [data]);
  const onTabClick = (key) => {
    setCurrent(key);
    refsMap[key].current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className={`${styles.section}`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tabsContainer} mb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <section className={`${styles.ingredientsList} custom-scroll`}>
        {Object.entries(groupedIngredients).map(([key, items]) => {
          return (
            <section ref={refsMap[key]} key={key}>
              <p className="text text_type_main-medium">{typesTitleMap[key]}</p>
              <div className={styles.grid}>
                {items.map((item) => (
                  <Ingredient data={item} key={item._id} />
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(IngredientType).isRequired,
};
export default BurgerIngredients;
