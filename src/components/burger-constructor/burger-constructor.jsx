import { useMemo, useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import IngredientType from "../types/ingredient-type";

function BurgerConstructor({ data }) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const bun = data.find((item) => item.type === "bun");
  const totalPrice = useMemo(() => {
    return data.reduce((total, item) => total + item.price, 0);
  }, [data]);
  return (
    <>
      <section className={`${styles.constructor} mt-25 ml-5`}>
        <section className={`${styles.list}`}>
          {data.length > 0 && (
            <>
              <div className="pl-8">
                <ConstructorElement
                  text={`${bun.name} (верх)`}
                  isLocked
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
              <div className={`${styles.scrollable} custom-scroll`}>
                {data
                  .filter((item) => item.type !== "bun")
                  .map((item) => {
                    return (
                      <div className={styles.listItem} key={item._id}>
                        <div className={`${styles.drag} mr-2`}>
                          <DragIcon />
                        </div>
                        <ConstructorElement
                          key={item._id}
                          text={item.name}
                          isLocked={item.type === "bun"}
                          price={item.price}
                          thumbnail={item.image}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="pl-8">
                <ConstructorElement
                  text={`${bun.name} (низ)`}
                  isLocked
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            </>
          )}
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(IngredientType).isRequired,
};

export default BurgerConstructor;
