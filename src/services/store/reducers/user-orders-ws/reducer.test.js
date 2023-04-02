import { userOrdersWsReducer } from "./reducer";
import { WsOrdersResponse } from "../../../../utils/test.data";

describe("ordersWsReducer reducer", () => {
  const initialState = {
    status: "OFFLINE",
    connectionError: "",
    orders: [],
    total: null,
    totalToday: null,
    loading: true,
  };

  it("should handle initial state", () => {
    expect(userOrdersWsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle USER_ORDERS_WS_CONNECTING", () => {
    expect(
      userOrdersWsReducer(initialState, {
        type: "USER_ORDERS_WS_CONNECTING",
      })
    ).toEqual({
      ...initialState,
      status: "CONNECTING",
    });
  });

  it("should handle USER_ORDERS_WS_OPEN", () => {
    expect(
      userOrdersWsReducer(initialState, {
        type: "USER_ORDERS_WS_OPEN",
      })
    ).toEqual({
      ...initialState,
      status: "ONLINE",
      connectionError: "",
    });
  });

  it("should handle USER_ORDERS_WS_CLOSE", () => {
    expect(
      userOrdersWsReducer(initialState, {
        type: "USER_ORDERS_WS_CLOSE",
      })
    ).toEqual({
      ...initialState,
      status: "OFFLINE",
    });
  });

  it("should handle USER_ORDERS_WS_ERROR", () => {
    const payload = "error";
    expect(
      userOrdersWsReducer(initialState, {
        type: "USER_ORDERS_WS_ERROR",
      })
    ).toEqual({
      ...initialState,
      connectionError: payload,
    });
  });

  it("should handle USER_ORDERS_WS_MESSAGE", () => {
    const payload = WsOrdersResponse;
    expect(
      userOrdersWsReducer(initialState, {
        type: "USER_ORDERS_WS_MESSAGE",
        payload,
      })
    ).toEqual({
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday,
      loading: false,
    });
  });
});
