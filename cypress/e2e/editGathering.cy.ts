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
    cy.contains("cypress 수정 테스트").should("exist");
    cy.contains("cypress 수정 테스트").click();
    cy.contains("수정").should("exist");
  });

  it("should go to edit page", () => {
    cy.contains("cypress 수정 테스트").should("exist");
    cy.contains("cypress 수정 테스트").click();
    cy.get('[data-cy="editPage"]').click();
    cy.location("pathname").should("contains", "/editGathering");
  });

  it("should go to edit page", () => {
    cy.contains("cypress 수정 테스트").should("exist");
    cy.contains("cypress 수정 테스트").click();
    cy.get('[data-cy="editPage"]').click();
    cy.location("pathname").should("contains", "/editGathering");
  });

  it("should go to edit gathering title", () => {
    cy.contains("cypress 수정 테스트").should("exist");
    cy.contains("cypress 수정 테스트").click();
    cy.get('[data-cy="editPage"]').click();
    cy.get("#title").clear();
    cy.get("#title").type("cypress 수정 테스트3");
    cy.contains("수정").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("cypress 수정 테스트3").should("exist");
  });
});
