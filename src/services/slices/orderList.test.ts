import { fetchMyOrders } from '../actions/order-actions';
import { initialState, myOrdersReducer } from './orderList-slice';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn(() =>
    Promise.resolve([
      {
        _id: '66d7fc9d119d45001b503fa1',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2024-09-04T06:22:21.104Z',
        updatedAt: '2024-09-04T06:22:21.577Z',
        number: 51930
      }
    ])
  )
}));

describe('Тест спизка заказов пользователя', () => {
  it('должен обрабатывать pending', () => {
    const action = { type: fetchMyOrders.pending.type };
    const state = myOrdersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('должен обрабатывать fulfilled', async () => {
    const mockOrders = [
      {
        _id: '66e9f8b2119d45001b507802',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy био-марсианский минеральный бургер',
        createdAt: '2024-09-17T21:46:26.339Z',
        updatedAt: '2024-09-17T21:46:26.815Z',
        number: 53260
      }
    ];

    const action = {
      type: fetchMyOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = myOrdersReducer(initialState, action);

    expect(state).toEqual({
      loading: false,
      orders: mockOrders,
      error: undefined
    });
  });

  it('должен обрабатывать rejected', () => {
    const action = {
      type: fetchMyOrders.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = myOrdersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка загрузки'
    });
  });
});
