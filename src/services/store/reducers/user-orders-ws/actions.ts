import { UserOrdersWsActions } from "../../../../ts/interfaces/types/orders-ws";
import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string, "USER_ORDERS_WS_CONNECT">(
  "USER_ORDERS_WS_CONNECT"
);
export const disconnect = createAction("USER_ORDERS_WS_DISCONNECT");
export const wsConnecting = createAction("USER_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("USER_ORDERS_WS_OPEN");
export const wsClose = createAction("USER_ORDERS_WS_CLOSE");
export const wsMessage = createAction<
  UserOrdersWsActions,
  "USER_ORDERS_WS_MESSAGE"
>("USER_ORDERS_WS_MESSAGE");
export const wsError = createAction<string, "USER_ORDERS_WS_ERROR">(
  "USER_ORDERS_WS_ERROR"
);

export type TUserOrdersWsActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
