import { createSocketMiddleware } from "./middleware/socket-middleware";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./indgredients/IngredientsSlice";
import ordersReducer from "./orders/OrdersSlice";
import userReducer from "./user/UserSlice";
import { ordersWsReducer } from "./reducers/orders-ws/reducer";
import {
  connect as OrdersWsConnect,
  disconnect as OrdersWsDisconnect,
  wsConnecting as OrdersWsConnecting,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersWsNessage,
  wsError as OrdersWsError,
} from "./reducers/orders-ws/actions";
import {
  connect as UserOrdersWsConnect,
  disconnect as UserOrdersWsDisconnect,
  wsConnecting as UserOrdersWsConnecting,
  wsOpen as UserOrdersWsOpen,
  wsClose as UserOrdersWsClose,
  wsMessage as UserOrdersWsNessage,
  wsError as UserOrdersWsError,
} from "./reducers/user-orders-ws/actions";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  user: userReducer,
  ordersWs: ordersWsReducer,
});

const ordersWsActions = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  wsConnecting: OrdersWsConnecting,
  onOpen: OrdersWsOpen,
  onClose: OrdersWsClose,
  onError: OrdersWsError,
  onMessage: OrdersWsNessage,
};

const userOrdersWsActions = {
  wsConnect: UserOrdersWsConnect,
  wsDisconnect: UserOrdersWsDisconnect,
  wsConnecting: UserOrdersWsConnecting,
  onOpen: UserOrdersWsOpen,
  onClose: UserOrdersWsClose,
  onError: UserOrdersWsError,
  onMessage: UserOrdersWsNessage,
};

const ordersMiddleware = createSocketMiddleware(ordersWsActions);
const userOrdersMiddleware = createSocketMiddleware(userOrdersWsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersMiddleware, userOrdersMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
