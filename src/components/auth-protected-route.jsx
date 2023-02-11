import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../services/store/user/UserSlice";

function AuthProtectedRoute({ element }) {
  const user = useSelector(selectCurrentUser);
  return user ? <Navigate to="/" replace /> : element;
}

export default AuthProtectedRoute;
