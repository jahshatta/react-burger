import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  addBun,
  addIngredient,
  removeIngredient,
  selectSelectedIngredients,
  selectAllBuns,
} from "../../services/store/indgredients/IngredientsSlice";
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
  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
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
                <ConstructorElement
                  text={`${topBun.name}`}
                  type="top"
                  isLocked
                  price={topBun.price}
                  thumbnail={topBun.image}
                />
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
                ingredients
                  .filter((item) => item.type !== "bun")
                  .map((item) => {
                    return (
                      <div className={styles.listItem} key={item.uuid}>
                        <div className={`${styles.drag} mr-2`}>
                          <DragIcon />
                        </div>
                        <ConstructorElement
                          key={item.uuid}
                          text={item.name}
                          isLocked={item.type === "bun"}
                          price={item.price}
                          thumbnail={item.image}
                          handleClose={(e) => {
                            dispatch(removeIngredient(item));
                          }}
                        />
                      </div>
                    );
                  })
              )}
            </div>
            <div className="pl-8">
              {bottomBun ? (
                <ConstructorElement
                  text={`${bottomBun.name} (низ)`}
                  type="bottom"
                  isLocked
                  price={bottomBun.price}
                  thumbnail={bottomBun.image}
                />
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
              setModalIsVisible(true);
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
