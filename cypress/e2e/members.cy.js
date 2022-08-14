describe("members test", () => {
  beforeEach(() => {
    cy.login('test1@hotmail.com', '12345678');
  });

  it("show members", () => {

    cy.visit("http://localhost:3000");
    cy.get('[data-cy=btn_select_group]').eq(2).click();
    cy.get("[data-cy=member]").should("have.length", 3);
  });

  it("very slow response members", () => {
    cy.intercept(
       "http://localhost:9000/api/groups/members/0141c873-ac3c-4a3f-a911-f32f31443727",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("slowResponse");

    cy.visit("http://localhost:3000");
    cy.get('[data-cy=btn_select_group]').eq(2).click();
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });

  
  it("remove member ", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-cy=btn_select_group]').eq(2).click();
    cy.get("[data-cy=btn_remove_member").eq(2).click();
    cy.get("[data-cy=member]").should("have.length", 2);
    cy.get("[data-cy=non_member]").should("have.length", 1);
  });

  it("very slow response add members", () => {
    cy.intercept(
       "http://localhost:9000/api/friends/23c1d4bb-2452-408c-b380-b61beed3d046",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("slowResponse");

    cy.visit("http://localhost:3000");
    cy.get('[data-cy=btn_select_group]').eq(2).click();
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });


  it("add again", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-cy=btn_select_group]').eq(2).click();
    cy.get("[data-cy=btn_add_member").eq(0).click();
    cy.get("[data-cy=member]").should("have.length", 3);
    cy.get("[data-cy=non_member]").should("have.length", 0);
  });

 
});