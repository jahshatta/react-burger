import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  addBun,
  addIngredient,
  selectSelectedIngredients,
  selectAllBuns,
  resetConstructor,
} from "../../services/store/indgredients/IngredientsSlice";
import { selectCurrentUser } from "../../services/store/user/UserSlice";
import ConstructorItem from "./constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import EmptyBun from "./empty-bun";
import styles from "./styles.module.css";
import { IIngredient } from "../../ts/interfaces/ingredient.interface";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { createOrder } from "../../services/store/orders/OrdersSlice";
import uuid4 from "uuid4";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const buns = useAppSelector(selectAllBuns);
  const ingredients = useAppSelector(selectSelectedIngredients);
  const currentUser = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [topBun, bottomBun] = buns;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const totalPrice = useMemo<number>(() => {
    return [...buns, ...ingredients].reduce(
      (total, item) => total + item.price,
      0
    );
  }, [ingredients, buns]);
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      const object = {
        ...item,
        uuid: uuid4(),
      };
      if (item.type !== "bun") {
        dispatch(addIngredient(object));
      } else {
        dispatch(addBun(object));
      }
    },
  });
  return (
    <>
      <section className={`${styles.constructor} pt-25 pb-5`}>
        <section className={`${styles.list} drop-area`} ref={dropRef}>
          <>
            <div className="pl-8">
              {topBun ? (
                <ConstructorItem data={topBun} type="top" />
              ) : (
                <EmptyBun type="top" />
              )}
            </div>
            <div className={`${styles.scrollable} custom-scroll`}>
              {ingredients.length === 0 ? (
                <div className={`${styles.emptyList} ml-8`}>
                  <p className="text text_type_main-default text_color_inactive">
                    Выберите начинки и соусы
                  </p>
                </div>
              ) : (
                ingredients.map((item: IIngredient, idx: number) => {
                  return (
                    <ConstructorItem data={item} key={item.uuid} index={idx} />
                  );
                })
              )}
            </div>
            <div className="pl-8">
              {bottomBun ? (
                <ConstructorItem data={bottomBun} type="bottom" />
              ) : (
                <EmptyBun type="bottom" />
              )}
            </div>
          </>
        </section>
        <section className={`${styles.total} pt-10 pr-2 pb-13 pl-2`}>
          <div className={`${styles.price} mr-10`}>
            <span className="text text_type_digits-medium mr-2">
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            title={
              currentUser ? undefined : "Авторизуйтесь чтобы оформить заказ"
            }
            onClick={() => {
              if (!currentUser) {
                navigate("/login");
                return;
              }
              dispatch(createOrder([buns[0], ...ingredients, buns[1]]));
              setModalIsVisible(true);
              dispatch(resetConstructor());
            }}
          >
            Оформить заказ
          </Button>
        </section>
      </section>
      {modalIsVisible && (
        <Modal
          onClose={() => {
            setModalIsVisible(false);
          }}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
