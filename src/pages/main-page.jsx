import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { fetchIngredients } from "../services/store/indgredients/IngredientsSlice";
import styles from "./main.module.css";

function MainPage() {
  const dispatch = useDispatch();
  const ingredientsStatus = useSelector((state) => state.ingredients.status);

  useEffect(() => {
    if (ingredientsStatus === "idle") {
      dispatch(fetchIngredients());
    }
  }, [ingredientsStatus, dispatch]);

  if (ingredientsStatus === "loading") {
    return <span>Загружаем ингредиенты...</span>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${styles.container} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
}

export default MainPage;
