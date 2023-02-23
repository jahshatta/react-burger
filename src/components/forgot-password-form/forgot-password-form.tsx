import { useState, useEffect, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  resetPassword,
  selectResetPasswordStatus,
  selectResetPasswordError,
} from "../../services/store/user/UserSlice";
import {
  EmailInput,
  Button,
  InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/store";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}
interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ForgotPasswordForm() {
  const { state, pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectResetPasswordStatus);
  const error = useAppSelector(selectResetPasswordError);

  const [email, setEmail] = useState(state.email);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/reset-password", {
        state: {
          from: pathname,
        },
      });
    }
  }, [status, navigate, pathname]);

  const onSubmit = async (e: FormEvent<FormElement>): Promise<void> => {
    e.preventDefault();
    dispatch(
      resetPassword({
        email: e.currentTarget.elements.email.value,
      })
    );
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <EmailInput
        name="email"
        required
        value={email}
        onChange={onChangeEmail}
        isIcon={false}
        placeholder="Укажите e-mail"
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
