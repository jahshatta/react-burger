import ResetPasswordForm from "../components/reset-password-form/reset-password-form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../services/store/user/UserSlice";

function ResetPasswordPage() {
  const user = useSelector(selectCurrentUser);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <ResetPasswordForm />;
}

export default ResetPasswordPage;
