import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  PasswordInput,
  Button,
  InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import {
  confirmResetPassword,
  selectConfirmResetPasswordStatus,
  selectConfirmResetPasswordError,
} from "../../services/store/user/UserSlice";

function ResetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const status = useSelector(selectConfirmResetPasswordStatus);
  const error = useSelector(selectConfirmResetPasswordError);

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const onChangeToken = (event) => {
    setToken(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      confirmResetPassword({
        password: e.target.password.value,
        token: e.target.token.value,
      })
    );
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (location?.state?.from !== "/forgot-password") {
    return <Navigate to="/login" replace />;
  }
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <PasswordInput
        name="password"
        required
        value={password}
        onChange={onChangePassword}
        placeholder="Введите новый пароль"
        extraClass="mb-6"
      />
      <Input
        type="text"
        name="token"
        required
        value={token}
        onChange={onChangeToken}
        placeholder="Введите код из письма"
        extraClass="mb-6"
      />
      {error ? (
        <div className={`${styles.error} mb-6`}>
          <InfoIcon type="error" />
          <p className="text text_type_main-default ml-2">{error}</p>
        </div>
      ) : null}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={status === "loading"}
        extraClass="mb-20"
      >
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default ResetPasswordForm;
