describe("groups test", () => {
  beforeEach(() => {
    cy.login('test1@hotmail.com', '12345678');
  });

  it("show groups", () => {

    cy.visit("http://localhost:3000");
    cy.get("[data-cy=group]").should("have.length", 3);
  });

  it("very slow response", () => {
    cy.intercept(
       "http://localhost:9000/api/groups/23c1d4bb-2452-408c-b380-b61beed3d046",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("slowResponse");

    cy.visit("http://localhost:3000");
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });

  it("add group ", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=group_name_input").type("TEST GROUP");
    cy.get("[data-cy=btn_group_create").click();
    cy.get("[data-cy=group_name").eq(3).contains("TEST GROUP");
    cy.get("[data-cy=group]").should("have.length", 4);
  });

  it("remove again", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=btn_group_delete").eq(3).click();
    cy.get("[data-cy=group]").should("have.length", 3);
  });

 
});