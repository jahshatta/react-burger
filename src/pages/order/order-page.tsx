import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import Modal from "../../components/modal/modal";
import { fetchIngredients } from "../../services/store/indgredients/IngredientsSlice";
import Loader from "../../components/loader/Loader";
import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/store";
import OrderInfo from "../../components/orders-feed/order-info/order-info";
import { fetchgOrderRequest } from "../../services/api/order";
import { OrderWs } from "../../ts/interfaces/types/orders-ws";

function OrdersPage(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<OrderWs | null>(null);
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    const fetchOrder = async () => {
      const { success, orders } = await fetchgOrderRequest(id!);
      setLoading(false);
      if (success) {
        setOrder(orders[0]);
      }
    };
    if (id) {
      fetchOrder();
    }
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }
  if (state?.showModal) {
    return (
      <Modal
        title={<p>{`# ${order!.number}`}</p>}
        onClose={() => {
          navigate(-1);
        }}
      >
        <OrderInfo data={order!} />
      </Modal>
    );
  }

  if (order) {
    dispatch(fetchIngredients());
    return (
      <div>
        <OrderInfo data={order} />
      </div>
    );
  }
  return <Navigate to="/" replace />;
}

export default OrdersPage;
