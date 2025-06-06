import React from "react";
import {  Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/registration/Registration";
import Home from "./components/homepage/Home";
import SignIn from "./components/signIn/SignIn";
import TodoApp from "./components/todoList/ToDoList";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/todo" element={<TodoApp />} />
    </Routes>
  );
};

export default App;
