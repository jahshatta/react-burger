import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  ingredients: [],
  status: "idle",
  error: null,
  selectedIngredientsIds: [
    "60d3b41abdacab0026a733c6",
    "60d3b41abdacab0026a733c8",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733cf",
    "60d3b41abdacab0026a733d3",
    "60d3b41abdacab0026a733cc",
  ],
  currentIngredientId: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api.get("/ingredients");
    return response.data.data;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    selectIngredient: (state, action) => {
      state.selectedIngredients.push(action.payload);
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredientId = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = state.ingredients.concat(action.payload);
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setIngredients,
  selectIngredient,
  setCurrentIngredient,
  setOrder,
} = ingredientsSlice.actions;

export const selectAllIngredients = (state) => state.ingredients.ingredients;
export const selectSelectedIngredients = (state) =>
  state.ingredients.ingredients.filter((item) =>
    state.ingredients.selectedIngredientsIds.includes(item._id)
  );
export const selectCurrentIngredient = (state) =>
  state.ingredients.ingredients.find(
    (ingredient) => ingredient._id === state.ingredients.currentIngredientId
  );

export default ingredientsSlice.reducer;
