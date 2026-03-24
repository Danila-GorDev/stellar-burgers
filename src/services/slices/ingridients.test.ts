import {
  fetchIngredientById,
  fetchIngredients
} from '../actions/ingredients-actions';
import { ingredientsReducer, initialState } from './ingridients-slice';

describe('fetchIngredients extraReducers', () => {
  it('должен обрабатывать pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('должен обрабатывать fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        __v: 0
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      data: mockIngredients,
      error: undefined,
      item: null
    });
  });

  it('должен обрабатывать rejected', () => {
    const action = {
      type: fetchIngredientById.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});

describe('fetchIngredientById extraReducers', () => {
  it('должен обрабатывать pending', () => {
    const action = { type: fetchIngredientById.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: undefined
    });
  });

  it('должен обрабатывать fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        __v: 0
      }
    ];
    const action = {
      type: fetchIngredientById.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      item: mockIngredients,
      isLoading: false
    });
  });

  it('должен обрабатывать rejected', () => {
    const action = {
      type: fetchIngredientById.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
