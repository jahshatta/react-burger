import { ReactElement, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import ProtectedRouteElement from "../protected-route";
import AuthProtectedRoute from "../auth-protected-route";
import MainPage from "../../pages/main/main-page";
import LoginPage from "../../pages/login/login-page";
import LogoutPage from "../../pages/logout/logout-page";
import RegisterPage from "../../pages/register/register-page";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password/reset-password-page";
import ProfilePage from "../../pages/profile/profile-page";
import ProfileFormPage from "../../pages/profile-form/profile-form-page";
import OrdersPage from "../../pages/orders/orders-page";
import OrderPage from "../../pages/order/order-page";
import IngredientPage from "../../pages/ingredient/ingredient-page";
import styles from "./styles.module.css";
import NotFoundPage from "../../pages/not-found/not-found-page";
import {
  getUser,
  selectgetUserStatus,
} from "../../services/store/user/UserSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/store";

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectgetUserStatus);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser());
    }
  }, [dispatch]);

  if (
    (status === "loading" || status === "idle") &&
    localStorage.getItem("accessToken")
  ) {
    return <div className={styles.loadingWrapper}>Загружаем бургерную</div>;
  }
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={<AuthProtectedRoute element={<LoginPage />} />}
          />
          <Route path="/logout" element={<LogoutPage />} />
          <Route
            path="/register"
            element={<AuthProtectedRoute element={<RegisterPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<AuthProtectedRoute element={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<AuthProtectedRoute element={<ResetPasswordPage />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          >
            <Route index path="" element={<ProfileFormPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderPage />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
