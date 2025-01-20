describe("Home page before login", () => {
  it("should show header without login", () => {
    cy.visit("/");
    cy.get("a").first().should("have.text", "HOME");
    cy.contains("Join us").should("exist");
    cy.get("a").eq(1).should("have.text", "MY CLIMBING");
    cy.get("button").first().should("have.text", "Log In");
  });

  it("can't access myClimbing page without login", () => {
    cy.visit("/");
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
    cy.visit("/");
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
    cy.visit("/");
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
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#email").type(email);
    cy.get("#password").type(pw);
    cy.get(".grid > .inline-flex").click();
    cy.intercept("/");
  });

  it("should be log in", () => {
    cy.contains("Log Out").should("exist");
  });
});
