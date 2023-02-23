import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../services/store/user/UserSlice";
import { useAppSelector } from "../hooks/store";

interface IProps {
  element: ReactElement;
}

function AuthProtectedRoute({ element }: IProps): ReactElement {
  const user = useAppSelector(selectCurrentUser);
  return user ? <Navigate to="/" replace /> : element;
}

export default AuthProtectedRoute;
