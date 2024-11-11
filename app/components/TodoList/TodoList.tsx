import styled from "styled-components";
import { TodoItem } from "../TodoItem/TodoItem";
import { AddTodo } from "../AddTodo/AddTodo";
import { Todo } from "../../hooks/useTodos/useTodos";

const TodoListContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: blue;
  margin-bottom: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

interface TodoListProps {
  todos: Todo[];
  error: string | null;
  onAddTodo: (text: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  error,
  onAddTodo,
  onDeleteTodo,
}) => {
  return (
    <TodoListContainer role="region" aria-label="Todo List">
      <Title>Todo List</Title>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      <AddTodo onAdd={onAddTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDeleteTodo} />
        ))}
      </ul>
    </TodoListContainer>
  );
};
