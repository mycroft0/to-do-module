import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../../types/types";

const useToDoList = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const storageKey = currentUser ? `todos-${currentUser.login}` : null;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"active" | "completed">("active");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    if (todos.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(todos));
    }
  }, [todos, storageKey]);

  const ITEMS_PER_PAGE = 5;

  const handleAdd = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleComplete = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: true } : t)));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signin");
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchFilter =
        filter === "active" ? !todo.completed : todo.completed;
      const matchSearch = todo.text
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [todos, filter, search]);

  const paginatedTodos = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredTodos.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTodos, page]);

  return {
    handleAdd,
    handleDelete,
    handleComplete,
    paginatedTodos,
    handleLogout,
    setFilter,
    setSearch,
    setPage,
    input,
    setInput,
    search,
    filter,
    filteredTodos,
    ITEMS_PER_PAGE,
    page,
    currentUser,
  };
};

export default useToDoList;
