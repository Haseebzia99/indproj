import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #dfe6e9;
  border-radius: 4px 0 0 4px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #74b9ff;
  }
`;

const AddButton = styled.button`
  background-color: #0984e3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #74b9ff;
  }
`;

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
      />
      <AddButton type="submit">+ Add</AddButton>
    </Form>
  );
};
