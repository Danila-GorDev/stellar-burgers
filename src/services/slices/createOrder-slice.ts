import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder } from '../actions/order-actions';

export interface TNewOrderState {
  loading: boolean;
  order: TOrder | null;
  error: string | undefined;
}

export const initialState: TNewOrderState = {
  loading: false,
  order: null,
  error: undefined
};

export const createOrderSlice = createSlice({
  name: 'cereateOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    getOrderLoad: (state) => state.loading,
    getOrderData: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      });
  }
});

export const { resetOrder } = createOrderSlice.actions;
export const { getOrderLoad, getOrderData } = createOrderSlice.selectors;

export const createOrderReducer = createOrderSlice.reducer;
