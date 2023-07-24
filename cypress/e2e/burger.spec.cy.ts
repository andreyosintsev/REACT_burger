describe("Работоспособность приложения Stellar Burger", () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it("Инициализация меню", () => {
    cy.contains("Конструктор");
    cy.contains("Лента заказов");
    cy.contains("Личный кабинет");
  });


  it("Загрузка ингридиентов", () => {
    cy.contains("Соберите бургер");
    cy.get('[data-test = "buns"] > li').should('have.length', 2);
    cy.get('[data-test = "sauces"] > li').should('have.length', 4);
    cy.get('[data-test = "mains"] > li').should('have.length', 9);
  });

  it("Инициализация конструктора", () => {
    cy.contains("Соберите свой бургер.");
    cy.contains("Оформить заказ");
  });

  it("Работоспособность модального окна с ингридиентом", () => {
    cy.get("[data-test='buns'] > li").eq(0).click();
    cy.get("[data-test='modal']").contains('Детали ингредиента');
    cy.get("[data-test='ingredient-name']").should('exist');
    cy.get("[data-test='calories']").should('exist');
    cy.get("[data-test='proteins']").should('exist');
    cy.get("[data-test='fat']").should('exist');
    cy.get("[data-test='carbohydrates']").should('exist');
    cy.get("[data-test='modal-close").click();
    cy.get("[data-test='modal']").should('not.exist');
  });

  it("Работоспособность оверлея модального окна с ингридиентом", () => {
    cy.get("[data-test='buns'] > li").eq(0).click();
    cy.get("[id='overlay']").should('exist');
    cy.get("[data-test='modal-close").click();
    cy.get("[id='overlay']").should('not.exist');
    cy.get("[data-test='buns'] > li").eq(0).click();
    cy.get("[id='overlay']").should('exist');
    cy.get("[id='overlay']").click({ force: true });
    cy.get("[id='overlay']").should('not.exist');
  })



  // it("Возможность перетащить булку в конструктор", () => {
  //   cy.get("[data-test='buns']").contains("Краторная булка N-200i").trigger("dragstart");
  //   cy.get("[data-test='drop-zone']").trigger("drop");
  //   cy.get("[data-test='drop-zone']").contains("Краторная булка N-200i").should("exist");
  // });
});