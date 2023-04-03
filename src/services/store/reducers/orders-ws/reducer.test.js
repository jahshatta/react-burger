import { ordersWsReducer, initialState } from "./reducer";
import { WsOrdersResponse } from "../../../../utils/test.data";

describe("ordersWsReducer reducer", () => {
  it("should handle initial state", () => {
    expect(ordersWsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle ORDERS_WS_CONNECTING", () => {
    expect(
      ordersWsReducer(initialState, {
        type: "ORDERS_WS_CONNECTING",
      })
    ).toEqual({
      ...initialState,
      status: "CONNECTING",
    });
  });

  it("should handle ORDERS_WS_OPEN", () => {
    expect(
      ordersWsReducer(initialState, {
        type: "ORDERS_WS_OPEN",
      })
    ).toEqual({
      ...initialState,
      status: "ONLINE",
      connectionError: "",
    });
  });

  it("should handle ORDERS_WS_CLOSE", () => {
    expect(
      ordersWsReducer(initialState, {
        type: "ORDERS_WS_CLOSE",
      })
    ).toEqual({
      ...initialState,
      status: "OFFLINE",
    });
  });

  it("should handle ORDERS_WS_ERROR", () => {
    const payload = "error";
    expect(
      ordersWsReducer(initialState, {
        type: "ORDERS_WS_ERROR",
      })
    ).toEqual({
      ...initialState,
      connectionError: payload,
    });
  });

  it("should handle ORDERS_WS_MESSAGE", () => {
    const payload = WsOrdersResponse;
    expect(
      ordersWsReducer(initialState, {
        type: "ORDERS_WS_MESSAGE",
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
