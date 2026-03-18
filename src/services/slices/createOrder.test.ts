import { createOrder } from '../actions/order-actions';
import {
  createOrderReducer,
  getOrderData,
  initialState,
  resetOrder
} from './createOrder-slice';

describe('Тест создания заказа', () => {
  it('initial state', () => {
    expect(createOrderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('очистка заказа', () => {
    const previousState = {
      loading: true,
      order: {
        _id: '671a8f96d829be001c7787ea',
        ingredients: [
          'Флюоресцентная булка R2-D3',
          'Филе Люминесцентного тетраодонтимформа',
          'Соус Spicy-X'
        ],
        status: 'done',
        name: 'Флюоресцентный spicy люминесцентный бургер',
        createdAt: '2026-02-15T18:19:02.774Z',
        updatedAt: '2026-02-15T18:19:03.715Z',
        number: 85952
      },
      error: 'Error'
    };
    expect(createOrderReducer(previousState, resetOrder())).toEqual(
      initialState
    );
  });

  it('должен обрабатывать pending', () => {
    const action = { type: createOrder.pending.type };
    const state = createOrderReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('должен обрабатывать fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: getOrderData }
    };
    const state = createOrderReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error: undefined,
      order: getOrderData,
      loading: false
    });
  });

  it('должен обрабатывать rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Error' }
    };
    const state = createOrderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error'
    });
  });
});
