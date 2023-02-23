import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uuid4 from "uuid4";
import api from "../../api/api";

const initialState = {
  ingredients: [],
  status: "idle",
  error: null,
  selectedBuns: [],
  selectedIngredients: [],
  countMap: {},
  currentIngredientId: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
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
    addIngredient: (state, action) => {
      const ingredient = { ...action.payload, uuid: uuid4() };
      state.selectedIngredients.push(ingredient);

      const { _id } = ingredient;
      if (!state.countMap[_id]) {
        state.countMap[_id] = 1;
      } else {
        state.countMap[_id] += 1;
      }
    },
    resetConstructor: (state) => {
      state.selectedBuns = [];
      state.selectedIngredients = [];
      state.countMap = {};
    },
    addBun: (state, action) => {
      const bun = action.payload;
      const currentBunId = state.selectedBuns[0]?._id ?? null;
      if (bun._id === currentBunId) {
        return;
      }
      state.selectedBuns = [
        {
          ...bun,
          uuid: uuid4(),
          name: `${bun.name} (верх)`,
        },
        {
          ...bun,
          uuid: uuid4(),
          name: `${bun.name} (низ)`,
        },
      ];
      const { _id } = bun;
      if (currentBunId) {
        delete state.countMap[currentBunId];
      }
      state.countMap[_id] = 1;
    },
    removeIngredient: (state, action) => {
      const ingredient = action.payload;

      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item.uuid !== ingredient.uuid
      );
      const { _id } = ingredient;
      if (state.countMap[_id] > 1) {
        state.countMap[_id] -= 1;
      } else {
        delete state.countMap[_id];
      }
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredientId = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    reorderIngredients: (state, action) => {
      const item = state.selectedIngredients.splice(action.payload.from, 1)[0];
      state.selectedIngredients.splice(action.payload.to, 0, item);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addBun,
  setIngredients,
  addIngredient,
  removeIngredient,
  resetConstructor,
  setCurrentIngredient,
  setOrder,
  reorderIngredients,
} = ingredientsSlice.actions;

export const selectAllIngredients = (state) => state.ingredients.ingredients;
export const selectSelectedIngredients = (state) =>
  state.ingredients.selectedIngredients;
export const selectCurrentIngredient = (state) =>
  state.ingredients.ingredients.find(
    (ingredient) => ingredient._id === state.ingredients.currentIngredientId
  );
export const selectAllBuns = (state) => state.ingredients.selectedBuns;
export const selectIngredientCount = (state, id) => {
  return state.ingredients.countMap[id] || 0;
};

export default ingredientsSlice.reducer;
