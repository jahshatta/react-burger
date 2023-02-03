import { Routes, Route } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page";
import LoginPage from "../../pages/login-page";
import styles from "./styles.module.css";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
