describe("delete gathering fail", () => {
  before(() => {
    const email = Cypress.env("testId2");
    const pw = Cypress.env("testPw2");
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(baseUrl);
    cy.contains("Log In").click();
    cy.get("#email").type(email);
    cy.get("#password").type(pw);
    cy.get(".grid > .inline-flex").click();
    cy.wait(100);
  });

  it("should not show edit btn when other user", () => {
    cy.contains("종로구 클라이밍").should("exist");
    cy.contains("종로구 클라이밍").click();
    cy.get('[data-cy="editPage"]').should("not.exist");
  });
});

// local에서 진행

// describe("delete gathering success", () => {
//   before(() => {
//     const email = Cypress.env("testId");
//     const pw = Cypress.env("testPw");
//     const baseUrl = Cypress.env("baseUrl");

//     cy.visit(baseUrl);
//     cy.contains("Log In").click();
//     cy.get("#email").type(email);
//     cy.get("#password").type(pw);
//     cy.get(".grid > .inline-flex").click();
//     cy.wait(100);
//   });

//   it("should not show edit btn when other user", () => {
//     cy.contains("cypress 수정 테스트").should("exist");
//     cy.contains("cypress 수정 테스트").click();
//     cy.get('[data-cy="editPage"]').click();
//     cy.contains("삭제").click();
//     cy.contains("cypress 수정 테스트").should("not.exist");
//   });
// });
