import { useRef } from "react";
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
import { IIngredient } from "../../ts/interfaces/ingredient.interface";
import { useAppDispatch } from "../../hooks/store";

interface Iprops {
  data: IIngredient;
  type?: "top" | "bottom";
  index?: number;
}

function ConstructorItem({ data, type, index, ...props }: Iprops) {
  const isLocked: boolean = data.type === "bun";
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "post",
    item: { index },
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
    hover(item: any, monitor) {
      console.log("item", item);
      if (!ref.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index || 0;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

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
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
        text={data.name}
        isLocked={isLocked}
        price={data.price}
        thumbnail={data.image}
        type={type}
        handleClose={() => {
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
