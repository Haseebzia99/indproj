"use client";

import React from "react";
import { createGlobalStyle } from "styled-components";
import { TodoListContainer } from "./containers/TodoListContainer/TodoListContainer";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #dfe6e9;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Home: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <TodoListContainer />
    </>
  );
};

export default Home;
