import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

function ForgotPasswordForm() {
  const { state, pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectResetPasswordStatus);
  const error = useSelector(selectResetPasswordError);

  const [email, setEmail] = useState(state.email);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        email: e.target.email.value,
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
