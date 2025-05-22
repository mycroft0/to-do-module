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
  const [sortBy, setSortBy] = useState<"name" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
      createdAt: Date.now(),
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
    const base = todos.filter((todo) => {
      const matchFilter = filter === "active" ? !todo.completed : todo.completed;
      const matchSearch = todo.text.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });

    return base.sort((a, b) => {
      let valA = sortBy === "name" ? a.text.toLowerCase() : a.createdAt || 0;
      let valB = sortBy === "name" ? b.text.toLowerCase() : b.createdAt || 0;

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [todos, filter, search, sortBy, sortOrder]);

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
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };
};

export default useToDoList;
