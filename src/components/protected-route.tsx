import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../services/store/user/UserSlice";
import { useAppSelector } from "../hooks/store";

type TProps = {
  element: ReactElement;
};

function ProtectedRouteElement({ element }: TProps): ReactElement {
  const user = useAppSelector(selectCurrentUser);
  return user ? element : <Navigate to="/login" replace />;
}

export default ProtectedRouteElement;
