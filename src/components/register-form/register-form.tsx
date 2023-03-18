import { useState, useEffect, FormEvent, ReactElement } from "react";
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
import { useAppDispatch, useAppSelector } from "../../hooks/store";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function RegisterForm(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector(selectRegisterStatus);
  const error = useAppSelector(selectRegisterError);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onSubmit = async (e: FormEvent<FormElement>): Promise<void> => {
    e.preventDefault();
    const params = {
      name: e.currentTarget.elements.name.value,
      email: e.currentTarget.elements.email.value,
      password: e.currentTarget.elements.password.value,
    };
    dispatch(register(params));
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
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
