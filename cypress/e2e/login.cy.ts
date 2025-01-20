describe("login", () => {
  it("should show login popup", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.contains("Welcome Back").should("exist");
    cy.contains("Email").should("exist");
    cy.contains("Password").should("exist");
  });

  it("should show alert with invalid email", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.get("#email").type("email");
    cy.get(".grid > .inline-flex").click();
    cy.contains("유효하지").should("exist");
  });

  it("should show alert with invalid pw", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.get("#email").type("email@email.com");
    cy.get("#password").type("pw");
    cy.get(".grid > .inline-flex").click();
    cy.contains("특수문자").should("exist");
  });

  it("should show alert with invalid pw length", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.get("#email").type("email@email.com");
    cy.get("#password").type("pw!a1");
    cy.get(".grid > .inline-flex").click();
    cy.contains("8자리").should("exist");
  });

  it("should be possible to sign up", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.get(".underline").click();
    cy.contains("Welcome Here").should("exist");
  });

  it("can log in with right id and pw", () => {
    const email = Cypress.env("testId");
    const pw = Cypress.env("testPw");
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.get("#email").type(email);
    cy.get("#password").type(pw);
    cy.get(".grid > .inline-flex").click();
    cy.visit(baseUrl);
    cy.getCookie("session").should("exist");
  });
});
