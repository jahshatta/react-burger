import LoginForm from "../components/login-form/login-form";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../services/store/user/UserSlice";
import { useSelector } from "react-redux";

function LoginPage() {
  const user = useSelector(selectCurrentUser);
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <LoginForm />;
}

export default LoginPage;
