import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos.js";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoForm({ initial, submitLabel, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...emptyForm, ...initial });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Judul wajib diisi";
    if (!form.deadline) err.deadline = "Deadline wajib diisi";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label className="label">Judul</label>
      <input
        className={`input ${errors.title ? "input-error" : ""}`}
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      {errors.title && <p className="error">{errors.title}</p>}

      <label className="label">Deskripsi</label>
      <textarea
        className="input"
        name="description"
        rows={3}
        value={form.description}
        onChange={handleChange}
      />

      <div className="row">
        <div className="col">
          <label className="label">Status</label>
          <select className="input" name="status" value={form.status} onChange={handleChange}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="label">Prioritas</label>
          <select className="input" name="priority" value={form.priority} onChange={handleChange}>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="label">Deadline</label>
      <input
        type="date"
        className={`input ${errors.deadline ? "input-error" : ""}`}
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
      />
      {errors.deadline && <p className="error">{errors.deadline}</p>}

      <div className="row actions">
        <button type="button" className="btn btn-red btn-block" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="btn btn-blue btn-block">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
