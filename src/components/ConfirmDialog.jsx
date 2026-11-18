import Modal from "./Modal.jsx";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="confirm-text">{message}</p>
      <div className="row actions">
        <button className="btn btn-gray btn-block" onClick={onCancel}>
          Batal
        </button>
        <button className="btn btn-red btn-block" onClick={onConfirm}>
          Hapus
        </button>
      </div>
    </Modal>
  );
}
