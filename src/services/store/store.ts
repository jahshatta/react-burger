import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./indgredients/IngredientsSlice";
import ordersReducer from "./orders/OrdersSlice";
import userReducer from "./user/UserSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
