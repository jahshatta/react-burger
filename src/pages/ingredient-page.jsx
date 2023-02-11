import {useLocation, useNavigate, useParams, Navigate} from 'react-router-dom'
import Modal from "../components/modal/modal";
import IngredientInfo from "../components/burger-ingredients/ingredient-info/ingredient-info";
import { setCurrentIngredient } from '../services/store/indgredients/IngredientsSlice';
import { useDispatch } from 'react-redux';

function IngredientPage() {
  const { state } = useLocation();
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  if (state?.showModal) {
    return <Modal
      title="Детали ингредиента"
      onClose={() => {
        navigate(-1);
      }}
    >
      <IngredientInfo />
    </Modal>
  }

  if(id) {
    dispatch(setCurrentIngredient(id));
    return <IngredientInfo />
  }
  return <Navigate to="/" replace />;
}

export default IngredientPage;
