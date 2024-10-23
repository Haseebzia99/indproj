import { useState, useEffect } from "react";

export interface Todo {
  id: string;
  text: string;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeDB = async () => {
    try {
      const response = await fetch("/api/init", { method: "POST" });
      if (!response.ok) throw new Error(".");
      setIsInitialized(true);
    } catch (err) {
      console.error("Error initializing database:", err);
      setError("Failed to initialize database");
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) throw new Error(".");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to fetch todos");
    }
  };

  useEffect(() => {
    const setup = async () => {
      await initializeDB();
      await fetchTodos();
    };
    setup();
  }, []);

  const addTodo = async (text: string) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to add todo");
      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo");
    }
  };

  return { todos, error, addTodo, deleteTodo, isInitialized };
};
