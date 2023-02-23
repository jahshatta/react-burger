import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IIngredient } from "./../../../ts/interfaces/ingredient.interface";
import { createOrderRequest } from "../../api/order";
import { TOrder } from "../../api/order";

interface IOrderState {
  lastOrder: TOrder | {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}

const initialState: IOrderState = {
  lastOrder: {},
  status: "idle",
  error: "",
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (ingredients: IIngredient[]) => {
    const ids = ingredients.map((item) => item._id);
    const response = await createOrderRequest(ids);
    return response;
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const selectLastOrderNumber = (state: any) =>
  state.orders.lastOrder.number;

export default ordersSlice.reducer;
