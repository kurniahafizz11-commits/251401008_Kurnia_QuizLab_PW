import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import Modal from "../components/Modal.jsx";
import TodoForm from "../components/TodoForm.jsx";
import Toast from "../components/Toast.jsx";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodo, updateTodo } = useTodos();
  const [showUpdate, setShowUpdate] = useState(false);

  const todo = getTodo(id);

  if (!todo) {
    return (
      <div className="detail-page">
        <div className="detail-card">
          <p className="confirm-text">Tugas tidak ditemukan.</p>
          <button className="btn btn-red" onClick={() => navigate("/")}>
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const handleUpdate = (data) => {
    updateTodo(todo.id, data);
    setShowUpdate(false);
  };

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-grid">
          <div className="detail-left">
            <h3>Judul</h3>
            <p>{todo.title}</p>
            <h3>Deskripsi</h3>
            <div className="desc-box">{todo.description || "-"}</div>
          </div>
          <div className="detail-right">
            <h3>Status</h3>
            <p>{todo.status}</p>
            <h3>Prioritas</h3>
            <p>{todo.priority}</p>
            <h3>Deadline</h3>
            <p>{todo.deadline}</p>
            <div className="row">
              <button className="btn btn-red" onClick={() => navigate("/")}>
                Kembali
              </button>
              <button className="btn btn-blue" onClick={() => setShowUpdate(true)}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUpdate && (
        <Modal title="Update Todo" onClose={() => setShowUpdate(false)}>
          <TodoForm
            initial={todo}
            submitLabel="Update"
            onSubmit={handleUpdate}
            onCancel={() => setShowUpdate(false)}
          />
        </Modal>
      )}

      <Toast />
    </div>
  );
}
