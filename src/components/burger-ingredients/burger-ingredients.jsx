import { useState, useMemo, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
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

  const [bunsRef, bunsView] = useInView();
  const [sausesRef, sausesView] = useInView();
  const [mainRef, mainView] = useInView();
  const ovserverRefsMap = {
    bun: bunsRef,
    sauce: sausesRef,
    main: mainRef,
  };
  const titleRefsMap = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
  };
  useEffect(() => {
    if (bunsView) {
      setCurrent("bun");
    } else if (sausesView) {
      setCurrent("sauce");
    } else if (mainView) {
      setCurrent("main");
    }
  }, [bunsView, sausesView, mainView]);

  const groupedIngredients = useMemo(() => {
    const grouped = {
      bun: [],
      sauce: [],
      main: [],
    };
    data.forEach((ingredient) => {
      const { type } = ingredient;
      grouped[type] = grouped[type] ?? [];
      grouped[type].push(ingredient);
    });
    return grouped;
  }, [data]);

  const onTabClick = (key) => {
    setCurrent(key);
    titleRefsMap[key].current.scrollIntoView({ behavior: "smooth" });
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
            <section ref={ovserverRefsMap[key]} key={key}>
              <p ref={titleRefsMap[key]} className="text text_type_main-medium">
                {typesTitleMap[key]}
              </p>
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
