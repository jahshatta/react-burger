import { useState, useEffect, useMemo } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./styles.module.css";
import { INGREDIENTSAPIURL } from "../../constants";

const selectedIngregientsIds = [
  "60d3b41abdacab0026a733c6",
  "60d3b41abdacab0026a733c8",
  "60d3b41abdacab0026a733c9",
  "60d3b41abdacab0026a733cf",
  "60d3b41abdacab0026a733d3",
  "60d3b41abdacab0026a733cc",
];

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        setLoading(true);
        const response = await fetch(INGREDIENTSAPIURL);

        if (!response.ok)
          throw new Error(
            `An error occurred while fetching ingredients: ${response.statusText}`
          );

        const ingredients = await response.json();
        setIngredients(ingredients.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    getIngredients();
  }, []);
  const selectedIngredients = useMemo(() => {
    return ingredients.filter((item) =>
      selectedIngregientsIds.includes(item._id)
    );
  }, [ingredients]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} p-5`}>
        {loading ? (
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
