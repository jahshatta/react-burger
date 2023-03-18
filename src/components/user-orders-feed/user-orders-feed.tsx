import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { fetchIngredients } from "../../services/store/indgredients/IngredientsSlice";
import styles from "./styles.module.css";
import {
  connect as ordersWsConnect,
  disconnect as ordersWsDisconnect,
} from "../../services/store/reducers/orders-ws/actions";
import Loader from "../loader/Loader";
import Feed from "../orders-feed/feed/Feed";
import { RootState } from "../../services/store/store";

const wsUrl = `wss://norma.nomoreparties.space/orders`;

function UserOrdersFeed() {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const ordersLoading = useAppSelector((state) => state.ordersWs.loading);
  const ingredientsLoaded = useAppSelector(
    (state: RootState) => state.ingredients.status === "succeeded"
  );
  const goToPage = (number: number): void => {
    navigate(`/profile/orders/${number}`, {
      state: {
        showModal: true,
      },
    });
  };
  useEffect(() => {
    if (!ingredientsLoaded) {
      dispatch(fetchIngredients());
    }
    const accessToken = localStorage.getItem("accessToken");
    dispatch(ordersWsConnect(`${wsUrl}?token=${accessToken}`));
    return () => {
      dispatch(ordersWsDisconnect());
    };
  }, [dispatch, ingredientsLoaded]);

  if (ordersLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <section className={`${styles.section}`}>
        <Feed goToPage={goToPage} />
      </section>
    </div>
  );
}

export default UserOrdersFeed;
