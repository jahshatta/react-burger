import { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

interface Props {
  value: string;
  onChange: () => void;
}

export default function PasswordInput({ value, onChange, ...props }: Props) {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  return (
    <Input
      type={showPassword ? "text" : "password"}
      onChange={onChange}
      value={value}
      name="password"
      icon={showPassword ? "HideIcon" : "ShowIcon"}
      onIconClick={() => setShowPassword(!showPassword)}
      placeholder="Пароль"
      {...props}
    />
  );
}
