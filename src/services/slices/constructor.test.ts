import {
  addIngredient,
  constructorReducer,
  initialState,
  removeIngredient,
  resetConstructor
} from './constructor-slice';

const testBun = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  id: '1'
};

const testIngredient = {
  _id: '2',
  id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

describe('Тест конструктора', () => {
  it('добавление ингредиента', () => {
    expect(
      constructorReducer(initialState, addIngredient(testIngredient))
        .ingredients
    ).toHaveLength(1);
  });

  it('удаление ингредента', () => {
    const state = {
      bun: null,
      ingredients: [testIngredient]
    };
    expect(
      constructorReducer(state, removeIngredient(testIngredient)).ingredients
    ).toHaveLength(0);
  });

  it('добавление булки', () => {
    expect(
      constructorReducer(initialState, addIngredient(testBun)).bun?._id
    ).toBe('1');
  });

  it('сброс конструктора', () => {
    const state = {
      bun: testBun,
      ingredients: [testIngredient]
    };
    const action = resetConstructor();
    const newState = constructorReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
