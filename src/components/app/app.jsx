import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./styles.module.css";
import data from "../../utils/data";

const selectedIngregients = [
  "60666c42cc7b410027a1a9b1",
  "60666c42cc7b410027a1a9b9",
  "60666c42cc7b410027a1a9b4",
  "60666c42cc7b410027a1a9bc",
  "60666c42cc7b410027a1a9bb",
  "60666c42cc7b410027a1a9bb",
  "60666c42cc7b410027a1a9bd",
  "60666c42cc7b410027a1a9be",
  "60666c42cc7b410027a1a9bf",
];

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} p-5`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor
          data={data.filter((item) => selectedIngregients.includes(item._id))}
        />
      </main>
    </div>
  );
}

export default App;
