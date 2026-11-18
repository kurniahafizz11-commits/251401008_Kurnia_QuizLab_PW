import { createContext, useCallback, useContext, useState } from "react";
import { dummyTodos } from "../data/dummyTodos.js";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, key: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addTodo = (data) => {
    setTodos((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      return [...prev, { id: nextId, ...data }];
    });
    showToast("Tugas berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    showToast("Tugas berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast("Tugas berhasil dihapus", "danger");
  };

  const getTodo = (id) => todos.find((t) => t.id === Number(id));

  return (
    <TodoContext.Provider
      value={{ todos, toast, addTodo, updateTodo, deleteTodo, getTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos harus dipakai di dalam TodoProvider");
  return ctx;
}
