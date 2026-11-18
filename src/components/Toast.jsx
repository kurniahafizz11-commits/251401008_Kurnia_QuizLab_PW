import { useTodos } from "../context/TodoContext.jsx";

export default function Toast() {
  const { toast } = useTodos();
  if (!toast) return null;
  return (
    <div key={toast.key} className={`toast toast-${toast.type}`} role="status">
      {toast.message}
    </div>
  );
}
