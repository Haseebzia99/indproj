import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoItem } from "../TodoItem";

describe("TodoItem", () => {
  const mockTodo = { id: "1", text: "Test Todo" };
  const mockOnDelete = jest.fn();

  it("renders todo text", () => {
    render(<TodoItem todo={mockTodo} onDelete={mockOnDelete} />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<TodoItem todo={mockTodo} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText("Delete"));

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });
});
