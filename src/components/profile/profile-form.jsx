import { useState, useEffect, useMemo } from "react";
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
  InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  updateUser,
  selectCurrentUser,
  selectUpdateUserStatus,
  selectUpdateUserError,
} from "../../services/store/user/UserSlice";
import styles from "./styles.module.css";

function ProfileForm() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const status = useSelector(selectUpdateUserStatus);
  const error = useSelector(selectUpdateUserError);

  const initialValues = useMemo(() => {
    return { ...user, password: "" };
  }, [user]);
  const [values, setValues] = useState({
    email: initialValues.email,
    name: initialValues.name,
    password: initialValues.password,
  });
  const [formIsDirty, setFormIsDirty] = useState(false);

  const resetForm = () => {
    setValues(initialValues);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // const params = {
    //   name: e.target.name.value,
    //   email: e.target.login.value,
    // };
    // if (e.target.password.value) {
    //   params.password = e.target.password.value;
    // }
    dispatch(updateUser(values));
  };
  const onFieldChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    setFormIsDirty(!shallowEqual(values, initialValues));
  }, [values, initialValues]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        type="text"
        placeholder="Имя"
        value={values.name}
        name="name"
        icon="EditIcon"
        extraClass="mb-6"
        onChange={onFieldChange}
      />
      <EmailInput
        value={values.email}
        name="email"
        placeholder="Логин"
        icon="EditIcon"
        extraClass="mb-6"
        onChange={onFieldChange}
      />
      <PasswordInput
        name="password"
        value={values.password}
        extraClass="mb-6"
        icon="EditIcon"
        onChange={onFieldChange}
      />
      {error ? (
        <div className={`${styles.error} mb-6`}>
          <InfoIcon type="error" />
          <p className="text text_type_main-default ml-2">{error}</p>
        </div>
      ) : null}
      {formIsDirty && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="mb-20"
            onClick={resetForm}
          >
            Отменить
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={status === "loading"}
            extraClass="mb-20"
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileForm;
