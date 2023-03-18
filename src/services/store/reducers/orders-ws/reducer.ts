import { OrderWs } from "./../../../../ts/interfaces/types/orders-ws";
import { WebsocketStatus } from "../../../../ts/interfaces/types/orders-ws";
import { createReducer } from "@reduxjs/toolkit";
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "./actions";

export type OrdersWsStore = {
  status: WebsocketStatus;
  connectionError: string;
  orders: OrderWs[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
};

const initialState: OrdersWsStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  orders: [],
  total: null,
  totalToday: null,
  loading: true,
};

export const ordersWsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.loading = false;
    });
});
