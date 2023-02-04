import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

function ResetPasswordForm() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const onChangeCode = (event) => {
    setCode(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form className={styles.form}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <PasswordInput
        name="password"
        value={password}
        onChange={onChangePassword}
        placeholder="Введите новый пароль"
        extraClass="mb-6"
      />
      <Input
        type="text"
        name="code"
        value={code}
        onChange={onChangeCode}
        placeholder="Введите код из письма"
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
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
