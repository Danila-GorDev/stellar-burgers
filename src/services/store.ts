import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slices/ingridients-slice';
import { constructorReducer } from './slices/constructor-slice';
import { userReducer } from './slices/user-slice';
import { feedReducer } from './slices/feed-slice';
import { myOrdersReducer } from './slices/orderList-slice';
import { createOrderReducer } from './slices/createOrder-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  orders: myOrdersReducer,
  createOrder: createOrderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
