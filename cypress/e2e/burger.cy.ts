const LOGIN = 'asosintsev@yandex.ru';
const PASSWORD = '123';
const INGREDIENTS = ['булка', 'соус', 'мясо'];

const dragAndDropItem = (ingredient) => {
  const dataTransfer = new DataTransfer();

  cy.get("*").contains('p', `${ingredient}`, { matchCase: false }).first().trigger("dragstart", { dataTransfer });
  cy.wait(3 * 1000);
  cy.get("[data-test='drop-zone']").trigger('drop', { dataTransfer });
  cy.wait(3 * 1000);
  cy.get("[data-test='drop-zone']").contains(`${ingredient}`, { matchCase: false }).should("exist");
} 

const loginProcedure = (login, password) => {
  cy.get("*").contains("E-mail").parent().within(() => {
    cy.wait(1000);
    cy.get("input").type(login);
  }); 

  cy.get("*").contains("Пароль").parent().within(() => {
    cy.wait(1000);
    cy.get("input").type(password);
  });

  cy.wait(1000);
  cy.contains("Войти").click();
} 

describe("App initializing", () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it("should displays app menu", () => {
    cy.contains("Конструктор").should('exist');
    cy.contains("Лента заказов").should('exist');
    cy.contains("Личный кабинет").should('exist');
  });

  it("should app menu be clickable", () => {
    cy.contains('Конструктор').click();
    cy.contains('Соберите бургер').should('exist');
    cy.contains('Лента заказов').click();
    cy.contains('Готовы').should('exist');
    cy.contains('Личный кабинет').click();
    cy.contains('Вход').should('exist');
  });

  it("should load ingredients", () => {
    cy.contains("Соберите бургер").should('exist');
    cy.get('[data-test = "buns"] > li').should('have.length', 2);
    cy.get('[data-test = "sauces"] > li').should('have.length', 4);
    cy.get('[data-test = "mains"] > li').should('have.length', 9);
  });

  it("should constructor be initialized", () => {
    cy.contains("Соберите свой бургер.").should('exist');
    cy.contains("Оформить заказ").should('exist');
  });
});

describe("Modal and details, url changes", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const checkIngredientModal = ($el) => {
    cy.wrap($el).click();
    cy.url().should('contain', '/ingredients/')
    cy.get("[data-test='modal']").contains('Детали ингредиента').should('exist');
    cy.get("[data-test='ingredient-name']").should('exist');
    cy.get("[data-test='calories']").should('exist');
    cy.get("[data-test='proteins']").should('exist');
    cy.get("[data-test='fat']").should('exist');
    cy.get("[data-test='carbohydrates']").should('exist');
    cy.get("[data-test='modal-close").click();
    cy.get("[data-test='modal']").should('not.exist');
    cy.url().should('not.contain', '/ingredients/')
  };
  
  const checkIngredientModalOverlay = ($el) => {
    cy.wrap($el).click();
    cy.get("[id='overlay']").should('exist');
    cy.get("[data-test='modal-close").click();
    cy.get("[id='overlay']").should('not.exist');
    cy.get("[data-test='buns'] > li").eq(0).click();
    cy.get("[id='overlay']").should('exist');
    cy.get("[id='overlay']").click({ force: true });
    cy.get("[id='overlay']").should('not.exist');
  };

  it("should display modal for all ingredients", () => {
      cy.get("[data-test='buns'] > li").each($el => checkIngredientModal($el)); 
      cy.get("[data-test='sauces'] > li").each($el => checkIngredientModal($el));
      cy.get("[data-test='mains'] > li").each($el => checkIngredientModal($el));     
    });

  it("should display modal overlay for all ingredients", () => {
    cy.get("[data-test='buns'] > li").each($el => checkIngredientModalOverlay($el)); 
    cy.get("[data-test='sauces'] > li").each($el => checkIngredientModalOverlay($el));
    cy.get("[data-test='mains'] > li").each($el => checkIngredientModalOverlay($el));
  });
});

describe("App Drag and Drop", () => {  
  beforeEach(() => {
    cy.visit('/');
  });

  it("should drag and drop ingredient into constructor", () => {
    INGREDIENTS.forEach(ingredient => dragAndDropItem(ingredient));
  })

  it("drag and drop, and then delete from the constructor", () => {
    dragAndDropItem('соус');

    cy.get("[data-test='drop-zone']")
      .contains("соус", { matchCase: false })
      .parent().get("span > svg").last().click();
   
    cy.get("[data-test='drop-zone']")
      .contains("constructor-element__text", "соус", { matchCase: false })
      .should('not.exist');
  })
});

describe("App Login", () => {  
  beforeEach(() => {
    cy.visit('/login');
  });

  it("should enter the login window credentials and go back to the homepage", () => {
    loginProcedure(LOGIN, PASSWORD);
    cy.contains("Соберите бургер").should('exist');
  });
});

describe("Creating of order", () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it("should creates the order after login", () => {
    loginProcedure(LOGIN, PASSWORD);
    INGREDIENTS.forEach(ingredient => dragAndDropItem(ingredient));
    cy.contains("Оформить заказ").click();
    cy.contains('Заказ создаётся.').should('exist');
    
    cy.wait(20 * 1000);

    cy.contains('идентификатор заказа').should('exist');
  });
});

describe("Order History before and after login", () => {  

  it("should enter the login page instead of profile history", () => {
    cy.visit('/profile/orders');
    cy.contains("Вход").should('exist');
  });

  it("should enter the profile history after login", () => {
    cy.visit('/profile/orders');
    loginProcedure(LOGIN, PASSWORD);
    cy.wait(5 * 1000);
    cy.contains('p', "бургер").should('exist');
  });
});

describe("App logout", () => {  

  it("should enter the login page instead of profile history", () => {
    cy.visit('/login');
    loginProcedure(LOGIN, PASSWORD);
    cy.wait(1000);
    cy.visit('/profile');

    cy.wait(1000);

    cy.contains("Выход").should('exist');
    cy.contains("Выход").click();

    cy.wait(1000);

    cy.contains("Вход").should('exist');
  });
});