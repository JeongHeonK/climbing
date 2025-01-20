describe("new Gathering", () => {
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

  it("should be logged in", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log Out").should("exist");
  });

  it("should be in the /newGathering", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.get('[data-cy="newGathering"]').click();
    cy.location("pathname").should("eq", "/newGathering");
    cy.contains("제목").should("exist");
    cy.contains("내용").should("exist");
  });

  it("should show error message without title", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.get('[data-cy="newGathering"]').click();
    cy.contains("모임 만들기").click();
    cy.contains("3자 이상 입력해주세요").should("exist");
  });

  it("should show error message without description", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.get('[data-cy="newGathering"]').click();
    cy.get("#title").type("test");
    cy.contains("모임 만들기").click();
    cy.contains("5자 이상 입력해주세요").should("exist");
  });

  it("should show error message without location", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.get('[data-cy="newGathering"]').click();
    cy.get("#title").type("test");
    cy.get("#description").type("test입니다.");
    cy.contains("모임 만들기").click();
    cy.contains("위치를 선택해주세요").should("exist");
  });

  it("should generate new gathering", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.get('[data-cy="newGathering"]').click();
    cy.get("#title").type("cypress_test");
    cy.get("#description").type("test입니다.");
    cy.get(`[data-cy="map"]`).click("bottom");
    cy.contains("모임 만들기").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("cypress_test").should("exist");
  });
});
