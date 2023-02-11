import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLogoutStatus } from "../services/store/user/UserSlice";

function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectLogoutStatus);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
}

export default LogoutPage;
