import { Outlet } from "react-router-dom";
import ProfileMenu from "../../components/profile/profile-menu";
import styles from "./profile.module.css";
import { ReactElement } from "react";

function ProfilePage(): ReactElement {
  return (
    <div className={`${styles.container} pt-30`}>
      <ProfileMenu />
      <Outlet />
    </div>
  );
}

export default ProfilePage;
