describe("myClimbing", () => {
  beforeEach(() => {
    const email = Cypress.env("testId");
    const pw = Cypress.env("testPw");
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.get("#email").type(email);
    cy.get("#password").type(pw);
    cy.get(".grid > .inline-flex").click();
    cy.wait(300);
  });

  it("should be logged in", () => {
    cy.contains("Log Out").should("exist");
  });

  it("should add gatherings with like button", () => {
    const baseUrl = Cypress.env("baseUrl");
    cy.get("[data-cy='like']").click({ multiple: true });

    cy.window().then((win) => {
      const localStorageData = win.localStorage.getItem("mine");
      expect(localStorageData).to.not.be.null;
    });

    cy.visit(baseUrl + "/myClimbing");
    cy.get("[data-cy='like']").should("have.length", 8);
  });

  it("should remove gatherings with like button", () => {
    const baseUrl = Cypress.env("baseUrl");
    cy.get("[data-cy='like']").click({ multiple: true });

    cy.visit(baseUrl + "/myClimbing");

    cy.get("[data-cy='like']").first().click();
    cy.get("[data-cy='like']").last().click();
    cy.get("[data-cy='like']").should("have.length", 6);
  });
});
