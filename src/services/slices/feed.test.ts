import { fetchFeeds } from '../actions/order-actions';
import { feedReducer, initialState } from './feed-slice';

describe('fetchFeeds extraReducers', () => {
  it('должен обрабатывать  pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('должен обрабатывать  fulfilled', () => {
    const feedResponse = {
      success: true,
      orders: [
        {
          _id: '66d7fc9d119d45001b503fa1',
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
          status: 'done',
          name: 'Краторный бургер',
          createdAt: '2024-09-04T06:22:21.104Z',
          updatedAt: '2024-09-04T06:22:21.577Z',
          number: 51930
        },
        {
          _id: '671a7352d829be001c77877c',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
          status: 'done',
          name: 'Флюоресцентный бургер',
          createdAt: '2024-10-24T16:18:26.559Z',
          updatedAt: '2024-10-24T16:18:27.439Z',
          number: 57396
        }
      ],
      total: 100,
      totalToday: 10
    };

    const action = { type: fetchFeeds.fulfilled.type, payload: feedResponse };
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      orders: feedResponse.orders,
      total: feedResponse.total,
      totalToday: feedResponse.totalToday
    });
  });

  it('должен обрабатывать  rejected', function () {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
