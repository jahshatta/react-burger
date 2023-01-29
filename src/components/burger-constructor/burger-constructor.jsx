import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
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
import { createOrder } from "../../services/store/orders/OrdersSlice";
import ConstructorItem from "./constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import EmptyBun from "./empty-bun";
import styles from "./styles.module.css";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const buns = useSelector(selectAllBuns);
  const ingredients = useSelector(selectSelectedIngredients);
  const [topBun, bottomBun] = buns;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const totalPrice = useMemo(() => {
    return [...buns, ...ingredients].reduce(
      (total, item) => total + item.price,
      0
    );
  }, [ingredients, buns]);
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type !== "bun") {
        dispatch(addIngredient(item));
      } else {
        dispatch(addBun(item));
      }
    },
  });
  return (
    <>
      <section className={`${styles.constructor} mt-25`}>
        <section className={`${styles.list}`} ref={dropRef}>
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
                ingredients.map((item, idx) => {
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
            <CurrencyIcon style={{ width: 36, height: 36 }} />
          </div>
          <Button
            htmlType="button"
            disabled={!(buns.length && ingredients.length)}
            type="primary"
            size="large"
            onClick={() => {
              dispatch(createOrder([...buns, ...ingredients]));
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
