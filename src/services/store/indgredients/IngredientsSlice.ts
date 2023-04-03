import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IIngredient } from "../../../ts/interfaces/ingredient.interface";
import { fetchIngredientsRequest } from "../../api/ingredients";

interface IIngredientsState {
  ingredients: IIngredient[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  selectedBuns: IIngredient[];
  selectedIngredients: IngredientWithUUID[];
  countMap: { [key: string]: number };
  currentIngredientId: string | null;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  status: "idle",
  error: "",
  selectedBuns: [],
  selectedIngredients: [],
  countMap: {},
  currentIngredientId: null,
};
type IngredientWithUUID = IIngredient & { uuid: string };

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const { data } = await fetchIngredientsRequest();
    return data;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient: IngredientWithUUID = {
        ...action.payload,
      };
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
          name: `${bun.name} (верх)`,
        },
        {
          ...bun,
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
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  setCurrentIngredient,
  reorderIngredients,
} = ingredientsSlice.actions;

export const selectAllIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsStatus = (state: RootState) =>
  state.ingredients.status;
export const selectSelectedIngredients = (state: RootState) =>
  state.ingredients.selectedIngredients;
export const selectCurrentIngredient = (state: RootState) =>
  state.ingredients.ingredients.find(
    (ingredient) => ingredient._id === state.ingredients.currentIngredientId
  );
export const selectAllBuns = (state: RootState) =>
  state.ingredients.selectedBuns;
export const selectIngredientCount = (state: RootState, id: string): number => {
  return state.ingredients.countMap[id] || 0;
};

export default ingredientsSlice.reducer;
