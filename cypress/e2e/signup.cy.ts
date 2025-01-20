describe("sign up fail", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.contains("Log In").click();
    cy.contains("Sign up").click();
  });

  it("should show sign up modal", () => {
    cy.contains("Welcome Here").should("exist");
  });

  it("should show error with invalid email", () => {
    cy.get("#email").type("invalid");
    cy.get(".grid > .inline-flex").click();
    cy.contains("유효하지 않은 이메일").should("exist");
  });

  it("should show error with invalid pw", () => {
    const email = Cypress.env("testId");
    cy.get("#email").type(email);
    cy.get("#password").type("invalid");
    cy.get(".grid > .inline-flex").click();
    cy.contains("특수문자와 영문이 포함되어야 합니다.").should("exist");
  });

  it("should show error with invalid pw length", () => {
    const email = Cypress.env("testId");
    const invalidPw = Cypress.env("testPw").slice(2);

    cy.get("#email").type(email);
    cy.get("#password").type(invalidPw);
    cy.get(".grid > .inline-flex").click();
    cy.contains("비밀번호는 8자리 이상이어야 합니다.").should("exist");
  });

  it("should show error with invalid pw confirm", () => {
    const email = Cypress.env("testId");
    const pw = Cypress.env("testPw");
    const invalidPw = Cypress.env("testPw").slice(2);

    cy.get("#email").type(email);
    cy.get("#password").type(pw);
    cy.get("#passwordCheck").type(invalidPw);
    cy.get(".grid > .inline-flex").click();
    cy.contains("일치하지 않습니다.").should("exist");
  });

  it("should show error with pw length", () => {
    const email = Cypress.env("testId");
    const pw = Cypress.env("testPw");

    cy.get("#email").type(email);
    cy.get("#password").type(pw);
    cy.get("#passwordCheck").type(pw);
    cy.get(".grid > .inline-flex").click();
    cy.contains("이미 등록된 이메일입니다.").should("exist");
  });
});
