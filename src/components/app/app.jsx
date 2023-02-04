import { Routes, Route } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page";
import ProfilePage from "../../pages/profile-page";
import ProfileFormPage from "../../pages/profile-form-page";
import OrdersPage from "../../pages/orders-page";
import OrderPage from "../../pages/order-page";
import IngredientPage from "../../pages/ingredient-page";
import styles from "./styles.module.css";
import NotFoundPage from "../../pages/not-found-page";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<ProfileFormPage />} />
            <Route path="/profile/orders" element={<OrdersPage />} />
            <Route path="/profile/orders/:id" element={<OrderPage />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
