describe('тест на добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('');
    cy.get('[data-cy=ingredients-buns]').as('ingredientsBun');
    cy.get('[data-cy=ingredients-mains]').as('ingredientsMains');
    cy.get('[data-cy=ingredients-sauces]').as('ingredientsSauces');
    cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
  });
  it('добавление булки', () => {
    cy.get('@ingredientsBun').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  it('добавление ингредиента', () => {
    cy.get('@ingredientsMains').contains('Добавить').click();
    cy.get('@ingredientsSauces').contains('Добавить').click();
    cy.get('@constructorIngredients').contains('Ингредиент 2').should('exist');
    cy.get('@constructorIngredients').contains('Ингредиент 4').should('exist');
  });
});

describe('Проверка работы модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('');
  });
  it('Открытие модального окна', () => {
    cy.contains('Ингредиент 2').click();
    cy.contains('Описание ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент 2').should('exist');
  });
  it('Закрытие модального окна по нажатию на кнопку', () => {
    cy.contains('Ингредиент 2').click();
    cy.contains('Описание ингредиента').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Описание ингредиента').should('not.exist');
  });
  it('Закрытие модального окна по нажатию вне окна', function () {
    cy.contains('Ингредиент 2').click();
    cy.contains('Описание ингредиента').should('exist');
    cy.get('[data-cy=close-overlay]').click('left', { force: true });
    cy.contains('Описание ингредиента').should('not.exist');
  });
});

describe('Тест создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'postOrder.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');
    cy.visit('');
    cy.get('[data-cy=ingredients-buns]').as('ingredientsBun');
    cy.get('[data-cy=ingredients-mains]').as('ingredientsMains');
    cy.get('[data-cy=ingredients-sauces]').as('ingredientsSauces');
    cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
  });

  it('Добавление ингредиентов и создание заказа', () => {
    cy.get('@ingredientsBun').contains('Добавить').click();
    cy.get('@ingredientsMains').contains('Добавить').click();
    cy.get('@ingredientsSauces').contains('Добавить').click();
    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=order-number]').as('orderNumber');
    cy.get('@orderNumber').contains('123456').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.get('@orderNumber').should('not.exist');

    cy.get('@constructorIngredients')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('@constructorIngredients')
      .contains('Ингредиент 2')
      .should('not.exist');
    cy.get('@constructorIngredients')
      .contains('Ингредиент 4')
      .should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
