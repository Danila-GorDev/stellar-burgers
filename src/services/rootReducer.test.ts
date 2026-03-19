import { constructorReducer } from './slices/constructor-slice';
import { createOrderReducer } from './slices/createOrder-slice';
import { feedReducer } from './slices/feed-slice';
import { ingredientsReducer } from './slices/ingridients-slice';
import { myOrdersReducer } from './slices/orderList-slice';
import { userReducer } from './slices/user-slice';
import { rootReducer } from './store';

it('handles unknown action correctly', () => {
  const fakeAction = { type: 'UNKNOWN_ACTION' };
  const state = rootReducer(undefined, fakeAction);
  expect(state).toEqual({
    ingredients: ingredientsReducer(undefined, fakeAction),
    burger: constructorReducer(undefined, fakeAction),
    feed: feedReducer(undefined, fakeAction),
    user: userReducer(undefined, fakeAction),
    orders: myOrdersReducer(undefined, fakeAction),
    createOrder: createOrderReducer(undefined, fakeAction)
  });
});
