import { ReactElement, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { fetchIngredients } from "../../services/store/indgredients/IngredientsSlice";
import { RootState } from "../../services/store/store";
import styles from "./main.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks/store";

function MainPage(): ReactElement {
  const dispatch = useAppDispatch();
  const ingredientsStatus = useAppSelector(
    (state: RootState) => state.ingredients.status
  );

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
      <div className={`${styles.container}`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
}

export default MainPage;
