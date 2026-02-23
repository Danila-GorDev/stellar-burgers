import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { TOrder, TOrdersData } from '@utils-types';

// Лента заказов (публичная)
export const fetchFeeds = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('orders/fetchFeeds', async (_, { rejectWithValue }) => {
  try {
    return await getFeedsApi();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка загрузки ленты заказов'
    );
  }
});

// Мои заказы (авторизованные)
export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки моих заказов'
      );
    }
  }
);

// Создание заказа
export const createOrder = createAsyncThunk<
  { order: TOrder; name: string },
  string[],
  { rejectValue: string }
>('orders/createOrder', async (ingredientIds, { rejectWithValue }) => {
  try {
    return await orderBurgerApi(ingredientIds);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка создания заказа'
    );
  }
});

// Получение заказа по номеру
export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchByNumber',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response;
  }
);
