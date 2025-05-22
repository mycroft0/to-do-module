import { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  login: string;
  password: string;
};

const useSignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.login === login && u.password === password
    );

    if (user) {
      setMessage("Sign-in successful!");
      setError(false);

      localStorage.setItem("currentUser", JSON.stringify(user));

      navigate("/todo");
    } else {
      setMessage("Invalid login or password.");
      setError(true);
    }
  };

  return {
    login,
    setLogin,
    password,
    setPassword,
    handleSignIn,
    message,
    error,
    navigate,
  };
};

export default useSignIn;
