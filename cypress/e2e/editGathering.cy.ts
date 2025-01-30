describe("edit gathering", () => {
  beforeEach(() => {
    const email = Cypress.env("testId");
    const pw = Cypress.env("testPw");
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.get("#email").type(email);
    cy.get("#password").type(pw);
    cy.get(".grid > .inline-flex").click();
    cy.wait(100);
  });

  it("should show edit button button", () => {
    cy.contains("양재 클라이밍 10명").should("exist");
    cy.contains("양재 클라이밍 10명").click();
    cy.contains("수정").should("exist");
  });

  it("should go to edit page", () => {
    cy.contains("양재 클라이밍 10명").should("exist");
    cy.contains("양재 클라이밍 10명").click();
    cy.get('[data-cy="editPage"]').click();
    cy.location("pathname").should("contains", "/editGathering");
  });

  it("should go to edit page", () => {
    cy.contains("양재 클라이밍 10명").should("exist");
    cy.contains("양재 클라이밍 10명").click();
    cy.get('[data-cy="editPage"]').click();
    cy.location("pathname").should("contains", "/editGathering");
  });

  // local에서 진행

  // it("should go to edit gathering title", () => {
  //   cy.contains("cypress_test").should("exist");
  //   cy.contains("cypress_test").click();
  //   cy.get('[data-cy="editPage"]').click();
  //   cy.get("#title").clear();
  //   cy.get("#title").type("cypress_test3");
  //   cy.contains("수정").click();
  //   cy.location("pathname").should("eq", "/");
  //   cy.contains("cypress_test3").should("exist");
  // });
});
