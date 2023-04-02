import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import api from "../../api/api";
import ordersReducer, {
  createOrder,
  selectLastOrderNumber,
} from "./OrdersSlice";
import {
  createOrderIngredients,
  createOrderResponse,
} from "../../../utils/test.data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("orders reducer", () => {
  const initialState = {
    lastOrder: {},
    status: "idle",
    error: "",
  };

  it("should return initial state", () => {
    expect(ordersReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should set status to loading when createOrder.pending is dispatched", () => {
    const state = ordersReducer(initialState, createOrder.pending());
    expect(state.status).toEqual("loading");
  });

  it("should set status to succeeded and update last order when createOrder.fulfilled is dispatched", () => {
    const order = { number: "123" };
    const state = ordersReducer(initialState, createOrder.fulfilled({ order }));
    expect(state.status).toEqual("succeeded");
    expect(state.lastOrder).toEqual(order);
  });

  it("should set status to failed and set error message when createOrder.rejected is dispatched", () => {
    const errorMessage = "Что-то пошло не так";
    const state = ordersReducer(
      initialState,
      createOrder.rejected({ error: { message: errorMessage } })
    );
    expect(state.status).toEqual("failed");
    expect(state.error).toEqual(errorMessage);
  });

  it("should select the last order number", () => {
    const order = { number: "123" };
    const state = { orders: { lastOrder: order } };
    expect(selectLastOrderNumber(state)).toEqual("123");
  });
});

describe("createOrder", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(api, { onNoMatch: "throwException" });
  });

  afterEach(() => {
    mock.reset();
  });

  it("should handle initial state", () => {
    expect(ordersReducer(undefined, { type: "unknown" })).toEqual({
      lastOrder: {},
      status: "idle",
      error: "",
    });
  });
  it("should handle createOrder", async () => {
    const store = mockStore({
      orders: { lastOrder: {}, status: "idle", error: "" },
    });

    mock.onPost("/orders").reply(200, createOrderResponse);

    await store.dispatch(createOrder(createOrderIngredients)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual("orders/createOrder/pending");
      expect(actions[1].type).toEqual("orders/createOrder/fulfilled");
    });
  });
});
