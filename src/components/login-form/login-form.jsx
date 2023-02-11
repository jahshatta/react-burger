import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectLoginStatus,
  selectLoginError,
} from "../../services/store/user/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <EmailInput
        onChange={onChangeEmail}
        value={email}
        name="email"
        isIcon={false}
        placeholder="E-mail"
        extraClass="mb-6"
      />
      <PasswordInput
        name="password"
        value={password}
        onChange={onChangePassword}
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
        disabled={status === "loading"}
        type="primary"
        size="medium"
        extraClass="mb-20"
      >
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link} state={{ email }}>
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
