import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../services/store/user/UserSlice";

function ProtectedRouteElement({ element, ...props }) {
  const user = useSelector(selectCurrentUser);
  return user ? element : <Navigate to="/login" replace />;
}

export default ProtectedRouteElement;
