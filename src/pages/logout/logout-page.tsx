import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  logout,
  selectLogoutStatus,
} from "../../services/store/user/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";

function LogoutPage(): null {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectLogoutStatus);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return null;
}

export default LogoutPage;
