import { Outlet } from "react-router-dom";
import ProfileMenu from "../components/profile/profile-menu";
import styles from "./profile.module.css";

function ProfilePage() {
  return (
    <div className={styles.container}>
      <ProfileMenu />
      <Outlet />
    </div>
  );
}

export default ProfilePage;
