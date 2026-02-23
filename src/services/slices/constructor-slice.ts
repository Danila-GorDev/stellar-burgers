import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export interface TConstructorItem {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export interface ConstructorState {
  items: TConstructorItem;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  current: TIngredient | null;
}

const initialState: ConstructorState = {
  items: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null,
  current: null
};

export const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.items.bun = action.payload;
      } else {
        state.items.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredient = state.items.ingredients[fromIndex];
      state.items.ingredients.splice(fromIndex, 1);
      state.items.ingredients.splice(toIndex, 0, ingredient);
    },
    resetConstructor: (state) => {
      state.items = { bun: null, ingredients: [] };
      state.orderRequest = false;
      state.orderModalData = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
