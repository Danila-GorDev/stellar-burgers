import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchMyOrders } from '../actions/order-actions';

export interface TOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | undefined;
}

export const initialState: TOrdersState = {
  orders: [],
  loading: true,
  error: undefined
};

export const myOrders = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    listMyOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { listMyOrders } = myOrders.selectors;

export const myOrdersReducer = myOrders.reducer;
