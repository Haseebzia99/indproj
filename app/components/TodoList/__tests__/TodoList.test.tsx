import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoList } from "../TodoList";

describe("TodoList", () => {
  const mockTodos = [
    { id: "1", text: "Test Todo 1" },
    { id: "2", text: "Test Todo 2" },
  ];
  const mockAddTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  it("renders todos", () => {
    render(
      <TodoList
        todos={mockTodos}
        error={null}
        onAddTodo={mockAddTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("prevents adding duplicate todos", () => {
    const { rerender } = render(
      <TodoList
        todos={mockTodos}
        error={null}
        onAddTodo={mockAddTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    const input = screen.getByPlaceholderText(
      "Add a new todo"
    ) as HTMLInputElement;
    const addButton = screen.getByText("+ Add");

    fireEvent.change(input, { target: { value: "Test Todo 1" } });
    fireEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledWith("Test Todo 1");

    rerender(
      <TodoList
        todos={mockTodos}
        error="This todo already exists!"
        onAddTodo={mockAddTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getByText("This todo already exists!")).toBeInTheDocument();
    expect(screen.getAllByText(/Test Todo/)).toHaveLength(2);
  });

  it("adds a new todo successfully", () => {
    const { rerender } = render(
      <TodoList
        todos={mockTodos}
        error={null}
        onAddTodo={mockAddTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    const input = screen.getByPlaceholderText(
      "Add a new todo"
    ) as HTMLInputElement;
    const addButton = screen.getByText("+ Add");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledWith("New Todo");

    const updatedMockTodos = [...mockTodos, { id: "3", text: "New Todo" }];

    rerender(
      <TodoList
        todos={updatedMockTodos}
        error={null}
        onAddTodo={mockAddTodo}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getAllByText(/Test Todo|New Todo/)).toHaveLength(3);
  });
});
