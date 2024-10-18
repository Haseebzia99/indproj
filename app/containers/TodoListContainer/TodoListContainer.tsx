import React from "react";
import { useTodos } from "../../hooks/useTodos/useTodos";
import { TodoList } from "../../components/TodoList/TodoList";

export const TodoListContainer: React.FC = () => {
  const { todos, error, addTodo, deleteTodo } = useTodos();

  return (
    <TodoList
      todos={todos}
      error={error}
      onAddTodo={addTodo}
      onDeleteTodo={deleteTodo}
    />
  );
};
