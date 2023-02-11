import ForgotPasswordForm from "../components/forgot-password-form/forgot-password-form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../services/store/user/UserSlice";

function ForgotPasswordPage() {
  const user = useSelector(selectCurrentUser);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <ForgotPasswordForm />;
}

export default ForgotPasswordPage;
