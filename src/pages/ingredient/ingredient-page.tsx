import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import Modal from "../../components/modal/modal";
import IngredientInfo from "../../components/burger-ingredients/ingredient-info/ingredient-info";
import {
  fetchIngredients,
  setCurrentIngredient,
} from "../../services/store/indgredients/IngredientsSlice";
import { ReactElement } from "react";
import { useAppDispatch } from "../../hooks/store";

function IngredientPage(): ReactElement {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (state?.showModal) {
    return (
      <Modal
        title={<p className="text text_type_main-large">Детали ингредиента</p>}
        onClose={() => {
          navigate(-1);
        }}
      >
        <IngredientInfo />
      </Modal>
    );
  }

  if (id) {
    dispatch(fetchIngredients());
    dispatch(setCurrentIngredient(id));
    return (
      <div>
        <IngredientInfo />
      </div>
    );
  }
  return <Navigate to="/" replace />;
}

export default IngredientPage;
