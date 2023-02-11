import RegisterForm from "../components/register-form/register-form";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../services/store/user/UserSlice";
import { useSelector } from "react-redux";

function RegisterPage() {
  const user = useSelector(selectCurrentUser);

  if (user) {
    return <Navigate to="/" replace />;
  }
  return <RegisterForm />;
}

export default RegisterPage;
