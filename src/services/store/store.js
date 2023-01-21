import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./indgredients/IngredientsSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
