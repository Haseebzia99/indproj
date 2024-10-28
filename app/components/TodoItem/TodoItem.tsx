import styled from "styled-components";
import React from "react";

interface Todo {
  id: string;
  text: string;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

const StyledTodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover,
  &:focus-within {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const TodoText = styled.span`
  flex-grow: 1;
  font-size: 2rem;
  color: #333;
`;

const DeleteButton = styled.button`
  background-color: #d63031;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover,
  &:focus {
    background-color: #ff4757;
    outline: 2px solid #0984e3;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <StyledTodoItem>
      <TodoText>{todo.text}</TodoText>
      <DeleteButton
        onClick={handleDelete}
        aria-label={`Delete todo: ${todo.text}`}
      >
        Delete
      </DeleteButton>
    </StyledTodoItem>
  );
};
