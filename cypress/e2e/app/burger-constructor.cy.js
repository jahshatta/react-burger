import { BASE_URL } from "../../../src/services/api/api";

describe("burger constructor functional tests", () => {
  beforeEach(() => {
    cy.intercept("POST", `${BASE_URL}/orders`).as("postOrder");
    cy.intercept("POST", `${BASE_URL}/auth/login`).as("login");
    cy.intercept("GET", `${BASE_URL}/ingredients`).as("getIngredients");

    cy.visit("login");
    cy.get("[name^=email]").type("vovek.zverev@gmail.com");
    cy.get("[name^=password]").type("111111");
    cy.get("button").contains("Войти").click();
    cy.wait("@login");
  });

  it("should open and close ingredients popup ", () => {
    cy.wait("@getIngredients");
    cy.get(".ingredient").first().click();
    cy.get("#modal svg").click();
  });

  it("should create an order", () => {
    cy.wait("@getIngredients");
    cy.get(".ingredient").first().trigger("dragstart");
    cy.get(".drop-area").trigger("drop");

    cy.get(".ingredient").contains("Соус").first().trigger("dragstart");
    cy.get(".drop-area").trigger("drop");
    cy.get(".ingredient").contains("Мясо").first().trigger("dragstart");
    cy.get(".drop-area").trigger("drop");
    cy.get(".constructor-element").should("have.length", 4);

    cy.get("button").contains("Оформить заказ").click().wait("@postOrder");
    cy.get("#modal svg").click();
  });
});
