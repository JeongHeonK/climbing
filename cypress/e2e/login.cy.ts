describe("login", () => {
  it("should show login popup", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.contains("Welcome Back").should("exist");
    cy.contains("Email").should("exist");
    cy.contains("Password").should("exist");
  });

  it("should show alert with invalid email", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#email").type("email");
    cy.get(".grid > .inline-flex").click();
    cy.contains("유효하지").should("exist");
  });

  it("should show alert with invalid pw", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#email").type("email@email.com");
    cy.get("#password").type("pw");
    cy.get(".grid > .inline-flex").click();
    cy.contains("특수문자").should("exist");
  });

  it("should show alert with invalid pw length", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#email").type("email@email.com");
    cy.get("#password").type("pw!a1");
    cy.get(".grid > .inline-flex").click();
    cy.contains("8자리").should("exist");
  });

  it("should be possible to sign up", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get(".underline").click();
    cy.contains("Welcome Here").should("exist");
  });

  it("can log in with right id and pw", () => {
    const email = Cypress.env("testId");
    const pw = Cypress.env("testPw");
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#email").type(email);
    cy.get("#password").type(pw);
    cy.get(".grid > .inline-flex").click();
    cy.visit("/");
    cy.getCookie("session").should("exist");
  });
});
