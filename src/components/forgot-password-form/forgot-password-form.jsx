import { useState } from "react";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form className={styles.form}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <EmailInput
        name="email"
        value={email}
        onChange={onChangeEmail}
        isIcon={false}
        placeholder="Укажите e-mail"
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
        Восстановить
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

export default ForgotPasswordForm;
