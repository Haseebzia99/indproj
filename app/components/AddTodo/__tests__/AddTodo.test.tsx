import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddTodo } from "../AddTodo";

describe("AddTodo", () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it("renders input and button", () => {
    render(<AddTodo onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    expect(screen.getByText("+ Add")).toBeInTheDocument();
  });

  it("calls onAdd with input value when form is submitted", () => {
    render(<AddTodo onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Add a new todo");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(screen.getByText("+ Add"));

    expect(mockOnAdd).toHaveBeenCalledWith("New Todo");
  });

  it("clears input after form submission", () => {
    render(<AddTodo onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText(
      "Add a new todo"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(screen.getByText("+ Add"));

    expect(input.value).toBe("");
  });
});
