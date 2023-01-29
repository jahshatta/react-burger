import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  lastOrder: {},
  status: "idle",
  error: null,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (ingredients) => {
    const ids = ingredients.map((item) => item._id);
    const response = await api.post("/orders", {
      ingredients: ids,
    });
    const { data } = response;
    if (data.success) {
    }
    console.log("response", response);
    return response.data;
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
      .addCase(createOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectLastOrderNumber = (state) => state.orders.lastOrder.number;

export default ordersSlice.reducer;
