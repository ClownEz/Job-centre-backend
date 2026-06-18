import './ApplicationCard.css';

const statusLabels = {
  pending: 'На рассмотрении',
  reviewed: 'Просмотрено',
  accepted: 'Принято',
  rejected: 'Отклонено',
};

export default function ApplicationCard({ application, vacancyTitle, onStatusChange, onDelete }) {
  return (
    <div className="application-card">
      <div className="app-card-header">
        <div>
          <h3>{application.applicantName}</h3>
          <p className="app-card-vacancy">{vacancyTitle}</p>
        </div>
        {onStatusChange ? (
          <select
            value={application.status}
            onChange={e => onStatusChange(application.id, e.target.value)}
            className={`status-select status-${application.status}`}
          >
            <option value="pending">На рассмотрении</option>
            <option value="reviewed">Просмотрено</option>
            <option value="accepted">Принято</option>
            <option value="rejected">Отклонено</option>
          </select>
        ) : (
          <span className={`status-badge status-${application.status}`}>
            {statusLabels[application.status]}
          </span>
        )}
      </div>
      <div className="app-card-contact">
        <span>{application.email}</span>
        <span>{application.phone}</span>
      </div>
      <p className="app-card-letter">{application.coverLetter}</p>
      <div className="app-card-footer">
        <span className="app-card-date">{application.createdAt}</span>
        {onDelete && (
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(application.id)}>
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}
