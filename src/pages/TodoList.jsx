import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import Modal from "../components/Modal.jsx";
import TodoForm from "../components/TodoForm.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import Toast from "../components/Toast.jsx";

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

export default function TodoList() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const handleAdd = (data) => {
    addTodo(data);
    setShowAdd(false);
  };

  const handleDelete = () => {
    deleteTodo(toDelete.id);
    setToDelete(null);
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Todo List</h1>
        <button className="btn btn-blue" onClick={() => setShowAdd(true)}>
          Tambah Todo
        </button>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th className="center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas baru.
                </td>
              </tr>
            )}
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="truncate" title={todo.title}>{todo.title}</td>
                <td>{todo.status}</td>
                <td>{todo.priority}</td>
                <td>{todo.deadline}</td>
                <td className="center">
                  <div className="icon-group">
                    <button
                      className="icon-btn icon-blue"
                      title="Lihat detail"
                      aria-label="Lihat detail"
                      onClick={() => navigate(`/todo/${todo.id}`)}
                    >
                      <EyeIcon />
                    </button>
                    <button
                      className="icon-btn icon-red"
                      title="Hapus"
                      aria-label="Hapus"
                      onClick={() => setToDelete(todo)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <Modal title="Tambah Todo" onClose={() => setShowAdd(false)}>
          <TodoForm
            submitLabel="Tambah"
            onSubmit={handleAdd}
            onCancel={() => setShowAdd(false)}
          />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Hapus Todo"
          message={`Yakin ingin menghapus tugas "${toDelete.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}

      <Toast />
    </div>
  );
}
