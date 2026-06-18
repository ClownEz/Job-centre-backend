import Modal from './Modal';
import './ConfirmDialog.css';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || 'Подтверждение'}>
      <p className="confirm-message">{message || 'Вы уверены?'}</p>
      <div className="confirm-actions">
        <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
        <button className="btn btn-danger" onClick={onConfirm}>Удалить</button>
      </div>
    </Modal>
  );
}
