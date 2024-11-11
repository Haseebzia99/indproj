describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("h1", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Todo List");
  });

  it("displays the todo list title", () => {
    cy.get("h1").should("contain", "Todo List");
  });

  it("can add a new todo", () => {
    const newTodo = "Buy groceries";
    cy.get('input[placeholder="Add a new todo"]')
      .should("be.visible")
      .type(newTodo, { delay: 100 });
    cy.get("button").contains("+ Add").should("be.enabled").click();
    cy.contains("li", newTodo, { timeout: 5000 }).should("be.visible");
  });

  it("can delete a todo", () => {
    const todoToDelete = "Delete me";
    cy.get('input[placeholder="Add a new todo"]')
      .should("be.visible")
      .type(todoToDelete, { delay: 100 });
    cy.get("button").contains("+ Add").should("be.enabled").click();
    cy.contains("li", todoToDelete, { timeout: 5000 }).within(() => {
      cy.get("button").contains("Delete").should("be.visible").click();
    });
    cy.contains(todoToDelete).should("not.exist");
  });

  it("can add multiple todos", () => {
    const todos = ["Buy milk", "Walk the dog", "Do laundry"];
    todos.forEach((todo, index) => {
      cy.get('input[placeholder="Add a new todo"]')
        .should("be.visible")
        .type(todo, { delay: 100 });
      cy.get("button").contains("+ Add").should("be.enabled").click();
      cy.wait(1000); // Wait for 1 second between adding todos
    });
    todos.forEach((todo) => {
      cy.contains("li", todo, { timeout: 5000 }).should("be.visible");
    });
  });
});
