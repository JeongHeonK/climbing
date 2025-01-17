describe("Home page", () => {
  it("should show header without login", () => {
    cy.visit("/");
    cy.get("a").first().should("have.text", "HOME");
    cy.get("a").eq(1).should("have.text", "MY CLIMBING");
    cy.get("button").first().should("have.text", "Log In");
  });
});
