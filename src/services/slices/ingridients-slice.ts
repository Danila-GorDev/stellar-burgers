import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import {
  fetchIngredientById,
  fetchIngredients
} from '../actions/ingredients-actions';

interface IngredientsState {
  item: TIngredient | null;
  data: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: IngredientsState = {
  item: null,
  data: [],
  isLoading: false,
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    clearIngredient: (state) => {
      state.item = null;
    }
  },
  selectors: {
    getIngredients: (state) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredientById.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchIngredientById.fulfilled, (state, action) => {
        state.item = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredientById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearIngredient } = ingredientsSlice.actions;
export const { getIngredients } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
