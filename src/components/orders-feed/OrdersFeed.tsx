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
import Feed from "./feed/Feed";
import Scoreboard from "./scoreboard/Scoreboard";
import { RootState } from "../../services/store/store";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";

function OrdersFeed() {
  const navigate: NavigateFunction = useNavigate();
  const goToPage = (number: number): void => {
    navigate(`/feed/${number}`, {
      state: {
        showModal: true,
      },
    });
  };
  const dispatch = useAppDispatch();
  const ordersLoading = useAppSelector((state) => state.ordersWs.loading);
  const ingredientsLoaded = useAppSelector(
    (state: RootState) => state.ingredients.status === "succeeded"
  );
  useEffect(() => {
    if (!ingredientsLoaded) {
      dispatch(fetchIngredients());
    }
    dispatch(ordersWsConnect(wsUrl));
    return () => {
      dispatch(ordersWsDisconnect());
    };
  }, [dispatch, ingredientsLoaded]);

  if (ordersLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <section className={`${styles.section} pb-5`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <Feed goToPage={goToPage} />
      </section>
      <Scoreboard />
    </div>
  );
}

export default OrdersFeed;
