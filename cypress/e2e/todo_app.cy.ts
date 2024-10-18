describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
  });

  it("displays the todo list", () => {
    cy.get("h1").should("contain", "Todo List");
  });

  it("can add a new todo", () => {
    const newTodo = "Buy groceries";
    cy.get('input[placeholder="Add a new todo"]').type(newTodo, { delay: 100 });
    cy.get("button").contains("+ Add").click();
    cy.wait(1000);
    cy.contains(newTodo).should("be.visible");
  });
  it("prevents adding duplicate todos", () => {
    cy.get('input[placeholder="Add a new todo"]').type("Test Todo");
    cy.contains("Add").click();
    cy.contains("Test Todo").should("exist");

    cy.get('input[placeholder="Add a new todo"]').type("Test Todo");
    cy.contains("Add").click();
    cy.contains("This todo already exists!").should("be.visible");

    cy.contains("Test Todo").should("have.length", 1);
  });

  it("can add multiple todos", () => {
    const todos = ["Buy chocholate", "Walk the dog", "Do laundry"];
    todos.forEach((todo) => {
      cy.get('input[placeholder="Add a new todo"]').type(todo, { delay: 100 });
      cy.get("button").contains("+ Add").click();
      cy.wait(1000);
    });
    todos.forEach((todo) => {
      cy.contains(todo).should("be.visible");
    });
  });

  it("can delete a todo", () => {
    const todoToDelete = "Delete me";
    cy.get('input[placeholder="Add a new todo"]').type(todoToDelete, {
      delay: 100,
    });
    cy.get("button").contains("+ Add").click();
    cy.wait(1000);
    cy.contains(todoToDelete)
      .parent()
      .find("button")
      .contains("Delete")
      .click();
    cy.wait(1000);
    cy.contains(todoToDelete).should("not.exist");
  });
});
