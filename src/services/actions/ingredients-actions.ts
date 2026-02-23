import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsApi } from '../../utils/burger-api';

import type { TIngredient } from '../../utils/types';

export const fetchIngredients = createAsyncThunk(
  'api/fetchIngredients',
  async () => await getIngredientsApi()
);

export const fetchIngredientById = createAsyncThunk<
  TIngredient,
  string,
  { rejectValue: string }
>('ingredients/fetchIngredientById', async (id, { rejectWithValue }) => {
  try {
    const data = await getIngredientsApi();
    const ingredient = data.find((item) => item._id === id);
    if (!ingredient) {
      return rejectWithValue('Ингредиент не найден');
    }
    return ingredient;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка загрузки ингредиента'
    );
  }
});
