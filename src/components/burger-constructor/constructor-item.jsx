import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  removeIngredient,
  reorderIngredients,
} from "../../services/store/indgredients/IngredientsSlice";
import PropTypes from "prop-types";
import IngredientType from "../types/ingredient-type";
import styles from "./styles.module.css";

function ConstructorItem({ data, type, index, ...props }) {
  const isLocked = data.type === "bun";
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "post",
    item: () => {
      return { index };
    },
    canDrag: !isLocked,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ handlerId }, drop] = useDrop({
    accept: ["post"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(reorderIngredients({ from: dragIndex, to: hoverIndex }));
      item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      className={styles.listItem}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      {!isLocked && (
        <div ref={drag} className={`${styles.drag} mr-2`}>
          <DragIcon />
        </div>
      )}
      <ConstructorElement
        text={data.name}
        isLocked={isLocked}
        price={data.price}
        thumbnail={data.image}
        type={type}
        handleClose={(e) => {
          dispatch(removeIngredient(data));
        }}
        {...props}
      />
    </div>
  );
}

ConstructorItem.propTypes = {
  data: IngredientType.isRequired,
  type: PropTypes.oneOf(["top", "bottom", undefined]),
  index: PropTypes.number,
};
export default ConstructorItem;
