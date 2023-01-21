import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
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
          <>
            <BurgerIngredients data={ingredients} />
            <BurgerConstructor data={selectedIngredients} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
