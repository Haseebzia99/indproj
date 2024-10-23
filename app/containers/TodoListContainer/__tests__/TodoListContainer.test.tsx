import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoListContainer } from "../TodoListContainer";
import { useTodos } from "../../../hooks/useTodos/useTodos";

// Mock the fetch function
global.fetch = jest.fn();

// Mock the useTodos hook
jest.mock("../../../hooks/useTodos/useTodos");

describe("TodoListContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders TodoList with data from useTodos hook", async () => {
    const mockTodos = [
      { id: "1", text: "Test Todo 1" },
      { id: "2", text: "Test Todo 2" },
    ];

    (useTodos as jest.Mock).mockReturnValue({
      todos: mockTodos,
      error: null,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      isInitialized: true,
    });

    render(<TodoListContainer />);

    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });
  });

  it("renders empty list when not initialized", () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [],
      error: null,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      isInitialized: false,
    });

    render(<TodoListContainer />);

    // Check that the todo list container is rendered
    expect(
      screen.getByRole("region", { name: "Todo List" })
    ).toBeInTheDocument();
    // Check that the add todo form is present
    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    // Check that no todos are shown
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("handles adding a new todo", async () => {
    const addTodo = jest.fn();
    const mockTodos = [{ id: "1", text: "Test Todo 1" }];

    (useTodos as jest.Mock).mockReturnValue({
      todos: mockTodos,
      error: null,
      addTodo,
      deleteTodo: jest.fn(),
      isInitialized: true,
    });

    render(<TodoListContainer />);

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("+ Add")).toBeInTheDocument();
  });

  it("handles deleting a todo", async () => {
    const deleteTodo = jest.fn();
    const mockTodos = [{ id: "1", text: "Test Todo 1" }];

    (useTodos as jest.Mock).mockReturnValue({
      todos: mockTodos,
      error: null,
      addTodo: jest.fn(),
      deleteTodo,
      isInitialized: true,
    });

    render(<TodoListContainer />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it("renders the title correctly", () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [],
      error: null,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      isInitialized: true,
    });

    render(<TodoListContainer />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  it("renders the add todo form", () => {
    (useTodos as jest.Mock).mockReturnValue({
      todos: [],
      error: null,
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      isInitialized: true,
    });

    render(<TodoListContainer />);
    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    expect(screen.getByText("+ Add")).toBeInTheDocument();
  });
});
