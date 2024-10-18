import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoListContainer } from "../TodoListContainer";
import { useTodos } from "../../../hooks/useTodos/useTodos";

jest.mock("../../../hooks/useTodos/useTodos");
jest.mock("../../../../firebase");
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));

describe("TodoListContainer", () => {
  it("renders TodoList with data from useTodos hook", () => {
    const mockTodos = [
      { id: "1", text: "Test Todo 1" },
      { id: "2", text: "Test Todo 2" },
    ];
    (useTodos as jest.Mock).mockReturnValue({
      todos: mockTodos,
      error: null,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
    });

    render(<TodoListContainer />);

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("renders error message when useTodos returns an error", () => {
    const errorMessage = "Test error message";
    (useTodos as jest.Mock).mockReturnValue({
      todos: [],
      error: errorMessage,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
    });

    render(<TodoListContainer />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
