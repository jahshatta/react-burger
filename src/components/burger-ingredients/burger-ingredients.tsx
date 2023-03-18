import { useState, useMemo, useRef, useEffect, MutableRefObject } from "react";
import { useInView } from "react-intersection-observer";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredient/ingredient";
import styles from "./styles.module.css";
import { selectAllIngredients } from "../../services/store/indgredients/IngredientsSlice";
import { IIngredient } from "../../ts/interfaces/ingredient.interface";
import { useAppSelector } from "../../hooks/store";

interface TTitles {
  [key: string]: string;
}
const typesTitleMap: TTitles = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};
type TGroupedIngredients = {
  bun: IIngredient[];
  sauce: IIngredient[];
  main: IIngredient[];
};
type TTitleRefsMap = {
  [key: string]: MutableRefObject<HTMLParagraphElement | null>;
};

type TOvserverRefsMap = {
  [key: string]: (node?: Element | null | undefined) => void;
};

function BurgerIngredients() {
  const [current, setCurrent] = useState<string>("bun");
  const ingredients = useAppSelector(selectAllIngredients);
  const [bunsRef, bunsView] = useInView();
  const [saucesRef, saucesView] = useInView();
  const [mainRef, mainView] = useInView();
  const ovserverRefsMap: TOvserverRefsMap = {
    bun: bunsRef,
    sauce: saucesRef,
    main: mainRef,
  };
  const titleRefsMap: TTitleRefsMap = {
    bun: useRef<HTMLParagraphElement>(null),
    sauce: useRef<HTMLParagraphElement>(null),
    main: useRef<HTMLParagraphElement>(null),
  };
  useEffect(() => {
    if (bunsView) {
      setCurrent("bun");
    } else if (saucesView) {
      setCurrent("sauce");
    } else if (mainView) {
      setCurrent("main");
    }
  }, [bunsView, saucesView, mainView]);

  const groupedIngredients = useMemo(() => {
    const grouped: TGroupedIngredients = {
      bun: [],
      sauce: [],
      main: [],
    };
    ingredients.forEach((ingredient) => {
      const { type } = ingredient;
      grouped[type] = grouped[type] ?? [];
      grouped[type].push(ingredient);
    });
    return grouped;
  }, [ingredients]);

  const onTabClick = (key: string) => {
    const ref = titleRefsMap[key];
    if (ref && ref.current != null) {
      setCurrent(key);
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className={`${styles.section} pb-5`}>
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

export default BurgerIngredients;
