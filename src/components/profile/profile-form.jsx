import { useState } from "react";
import {
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileForm() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeLogin = (event) => {
    setLogin(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form>
      <Input
        type="text"
        placeholder="Имя"
        onChange={onChangeName}
        value={name}
        name="name"
        icon="EditIcon"
        extraClass="mb-6"
      />
      <EmailInput
        onChange={onChangeLogin}
        value={login}
        name="login"
        placeholder="Логин"
        icon="EditIcon"
        extraClass="mb-6"
      />
      <PasswordInput
        name="password"
        value={password}
        onChange={onChangePassword}
        extraClass="mb-6"
        icon="EditIcon"
      />
    </form>
  );
}

export default ProfileForm;
