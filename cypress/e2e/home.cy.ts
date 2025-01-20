describe("Home page before login", () => {
  it("should show header without login", () => {
    const baseUrl = Cypress.env("baseUrl");
    cy.visit(baseUrl);
    cy.get("a").first().should("have.text", "HOME");
    cy.contains("Join us").should("exist");
    cy.get("a").eq(1).should("have.text", "MY CLIMBING");
    cy.get("button").first().should("have.text", "Log In");
  });

  it("can't access myClimbing page without login", () => {
    const baseUrl = Cypress.env("baseUrl");
    cy.visit(baseUrl);
    cy.getCookie("session").should("not.exist");
    cy.get("a").eq(1).click();
    cy.contains("로그인 후 이용해주세요").as("alert");
    cy.get("@alert").should("exist");
    cy.get(".group > .absolute").click();
    cy.get("@alert").should("not.exist");
    cy.get("[data-cy='modal-bg']").as("modal-bg");
    cy.get("@modal-bg").should("exist");
    cy.get("@modal-bg").click("bottom");
    cy.get("@modal-bg").should("not.exist");
  });

  it("can't access detail without login", () => {
    const baseUrl = Cypress.env("baseUrl");
    cy.visit(baseUrl);
    cy.getCookie("session").should("not.exist");
    cy.get(".px-auto > :nth-child(2)").click("bottom");
    cy.contains("로그인 후 이용해주세요").as("alert");
    cy.get("@alert").should("exist");
    cy.get(".group > .absolute").click();
    cy.get("@alert").should("not.exist");
    cy.get("[data-cy='modal-bg']").as("modal-bg");
    cy.get("@modal-bg").should("exist");
    cy.get("@modal-bg").click("bottom");
    cy.get("@modal-bg").should("not.exist");
  });

  it("can't make new gathering", () => {
    const baseUrl = Cypress.env("baseUrl");
    cy.visit(baseUrl);
    cy.getCookie("session").should("not.exist");
    cy.get("[data-cy='newGathering']").click();
    cy.contains("로그인 후 이용해주세요").as("alert");
    cy.get("@alert").should("exist");
    cy.get(".group > .absolute").click();
    cy.get("@alert").should("not.exist");
    cy.get("[data-cy='modal-bg']").as("modal-bg");
    cy.get("@modal-bg").should("exist");
    cy.get("@modal-bg").click("bottom");
    cy.get("@modal-bg").should("not.exist");
  });
});

describe("home page after login", () => {
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

  it("should be log in", () => {
    cy.contains("Log Out").should("exist");
  });

  it("should be able to go myClimbing", () => {
    cy.get("a").eq(1).click();
    cy.location("pathname").should("eq", "/myClimbing");
    cy.contains("My Climbing").should("exist");
  });

  it("should be able to go detail", () => {
    cy.get(".px-auto > :nth-child(2)").click("bottom");
    cy.location("pathname").should("contains", "/detail");
  });

  it("should be able to go detail", () => {
    cy.get("[data-cy='newGathering']").click();
    cy.location("pathname").should("contains", "/newGathering");
  });
});

describe("log out", () => {
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

  it("should be logged out", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log Out").click();
    cy.location("pathname").should("contains", "/");
  });
});
