import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./indgredients/IngredientsSlice";
import ordersReducer from "./orders/OrdersSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
