import { useState } from "react";
import { User } from "../../types/types";
import {isValidLogin} from '../../helpers/validation'

const useRegistration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleRegister = () => {
    if (!isValidLogin(login)) {
      setMessage("Login must not contain numbers!");
      setError(true);
      return;
    }
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((user) => user.login === login)) {
      setMessage("User already exists!");
      setError(true);
      return;
    }

    const newUser = { login, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    setMessage("Registration successful!");
    setError(false);
    setLogin("");
    setPassword("");
  };
  return {
    handleRegister,
    login,
    setLogin,
    password,
    setPassword,
    message,
    error,
    isValidLogin
  };
};

export default useRegistration;
