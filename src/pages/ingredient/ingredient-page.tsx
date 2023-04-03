import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/modal";
import IngredientInfo from "../../components/burger-ingredients/ingredient-info/ingredient-info";
import {
  fetchIngredients,
  setCurrentIngredient,
} from "../../services/store/indgredients/IngredientsSlice";
import { ReactElement } from "react";
import { useAppDispatch } from "../../hooks/store";

function IngredientPage(): ReactElement {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  dispatch(fetchIngredients());
  dispatch(setCurrentIngredient(id));
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

  return (
    <div>
      <IngredientInfo />
    </div>
  );
}

export default IngredientPage;
