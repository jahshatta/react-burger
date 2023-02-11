import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
  InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  register,
  selectRegisterStatus,
  selectRegisterError,
} from "../../services/store/user/UserSlice";
import styles from "./styles.module.css";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectRegisterStatus);
  const error = useSelector(selectRegisterError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      register({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <Input
        type="text"
        placeholder="Имя"
        onChange={onChangeName}
        value={name}
        name="name"
        extraClass="mb-6"
      />
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
        disabled={status === "loading"}
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
      >
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
