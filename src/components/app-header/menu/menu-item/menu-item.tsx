import { NavLink, useLocation, matchPath } from "react-router-dom";

import styles from "./styles.module.css";
import { FC } from "react";

const baseClassName: string = "text text_type_main-default";

interface IProps {
  Icon: FC<{ type: "primary" | "secondary" }>;
  text: string;
  path: string;
}
function MenuItem({ Icon, text, path }: IProps) {
  const location = useLocation();
  const isActive = !!matchPath({ path }, location.pathname);
  const linkClassName = ({ isActive }: { isActive: boolean }): string => {
    return `${styles.link} ${baseClassName} ${
      isActive ? "" : "text_color_inactive"
    }`;
  };

  return (
    <li className={`${styles.item} pt-4 pr-5 pb-4 pl-5`}>
      <NavLink to={path} className={linkClassName}>
        <Icon type={isActive ? "primary" : "secondary"} />
        <span className="ml-2">{text}</span>
      </NavLink>
    </li>
  );
}

export default MenuItem;
