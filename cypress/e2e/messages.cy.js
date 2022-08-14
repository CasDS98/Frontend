describe("messages test", () => {
  beforeEach(() => {
    cy.login('test1@hotmail.com', '12345678');
  });

  it("show messages", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/messages/0141c873-ac3c-4a3f-a911-f32f31443727",
      { fixture: "messagesGroupChat" }
    );

    cy.visit("http://localhost:3000");
    cy.get('[data-cy=btn_select_group]').eq(2).click();
    cy.get("[data-cy=message]").should("have.length", 3);
    cy.get("[data-cy=message_user]").eq(0).contains("test_2");
    cy.get("[data-cy=message_content]").eq(0).contains("user two to group chat");
    cy.get("[data-cy=message_date]").eq(0).should("contain", "1-1-2020 00:00:00");
  });

  it("very slow response", () => {
    cy.intercept(
       "http://localhost:9000/api/messages/0141c873-ac3c-4a3f-a911-f32f31443727",
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

  it("add message ", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-cy=btn_select_group]').eq(2).click();
    cy.get("[data-cy=message_input").type("TEST MESSAGE");
    cy.get("[data-cy=btn_msg_submit").click();

  
    cy.get("[data-cy=message_content]").eq(3).contains("TEST MESSAGE");
    cy.get("[data-cy=message]").should("have.length", 4);
  });

  it("remove again", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-cy=btn_select_group]').eq(2).click();
    cy.get("[data-cy=btn_msg_remove").eq(1).click();
    cy.get("[data-cy=message]").should("have.length", 3);
  });

 
});