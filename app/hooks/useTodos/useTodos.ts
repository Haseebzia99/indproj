import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";

export interface Todo {
  id: string;
  text: string;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const todosArr: Todo[] = [];
        querySnapshot.forEach((doc) => {
          todosArr.push({ id: doc.id, text: doc.data().text });
        });
        setTodos(todosArr);
      },
      (error) => {
        console.error("Error fetching todos:", error);
        setError("Failed to fetch todos. Please try again.");
      }
    );

    return () => unsubscribe();
  }, []);

  const addTodo = async (text: string) => {
    if (todos.some((todo) => todo.text === text)) {
      setError("This todo already exists!");
      return;
    }
    try {
      await addDoc(collection(db, "todos"), { text });
      setError(null);
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Failed to add todo. Please try again.");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setError(null);
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Failed to delete todo. Please try again.");
    }
  };

  return { todos, error, addTodo, deleteTodo };
};
