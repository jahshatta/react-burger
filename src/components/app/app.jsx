import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  selectAllIngredients,
  selectSelectedIngredients,
  fetchIngredients,
} from "../../services/store/indgredients/IngredientsSlice";

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectAllIngredients);
  const selectedIngredients = useSelector(selectSelectedIngredients);
  const ingredientsStatus = useSelector((state) => state.ingredients.status);

  useEffect(() => {
    if (ingredientsStatus === "idle") {
      dispatch(fetchIngredients());
    }
  }, [ingredientsStatus, dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} p-5`}>
        {ingredientsStatus === "loading" ? (
          <span>Загружаем ингредиенты...</span>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients data={ingredients} />
            <BurgerConstructor data={selectedIngredients} />
          </DndProvider>
        )}
      </main>
    </div>
  );
}

export default App;
