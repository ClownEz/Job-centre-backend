import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getVacancyById, getCompanyById, getApplicationsByVacancy,
  deleteVacancy, updateApplication,
} from '../../services/dataService';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmDialog from '../Common/ConfirmDialog';
import ApplicationForm from '../Application/ApplicationForm';
import './VacancyDetail.css';

const typeLabels = {
  'full-time': 'Полный день',
  'part-time': 'Частичная занятость',
  'remote': 'Удалённая работа',
  'contract': 'Проектная работа',
};

export default function VacancyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [vacancy, setVacancy] = useState(null);
  const [company, setCompany] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showAppForm, setShowAppForm] = useState(false);

  useEffect(() => {
    const v = getVacancyById(id);
    if (v) {
      setVacancy(v);
      setCompany(getCompanyById(v.companyId));
      setApplications(getApplicationsByVacancy(id));
    }
  }, [id]);

  if (!vacancy) {
    return <div className="empty-state">Вакансия не найдена</div>;
  }

  function handleDelete() {
    deleteVacancy(vacancy.id);
    navigate('/vacancies');
  }

  function handleStatusChange(appId, newStatus) {
    updateApplication(appId, { status: newStatus });
    setApplications(getApplicationsByVacancy(id));
  }

  return (
    <div className="vacancy-detail-page">
      <button className="btn btn-ghost" onClick={() => navigate('/vacancies')}>
        &larr; Назад к вакансиям
      </button>

      <div className="vacancy-detail-card">
        <div className="vacancy-detail-header">
          <div>
            <h1>{vacancy.title}</h1>
            <p className="vacancy-detail-company">
              {company && (
                <Link to={`/company/${company.id}`} className="company-link">
                  <span className="company-badge">{company.name.charAt(0)}</span>
                  {company.name} &mdash; {company.industry}
                </Link>
              )}
            </p>
          </div>
          <span className={`vacancy-type type-${vacancy.type}`}>
            {typeLabels[vacancy.type]}
          </span>
        </div>

        <div className="vacancy-detail-meta">
          <div className="meta-item">
            <strong>Зарплата:</strong> {vacancy.salary}
          </div>
          <div className="meta-item">
            <strong>Локация:</strong> {vacancy.location}
          </div>
          <div className="meta-item">
            <strong>Категория:</strong> {vacancy.category}
          </div>
          <div className="meta-item">
            <strong>Дата:</strong> {vacancy.createdAt}
          </div>
        </div>

        {company && (
          <Link to={`/company/${company.id}`} className="company-inline-block">
            <h3>Работодатель</h3>
            <div className="company-inline-body">
              <div className="company-inline-icon">{company.name.charAt(0)}</div>
              <div>
                <strong>{company.name}</strong>
                <p>{company.industry} &middot; {company.location}</p>
              </div>
              <svg className="company-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>
        )}

        <div className="vacancy-detail-section">
          <h3>Описание вакансии</h3>
          <p>{vacancy.description}</p>
        </div>

        <div className="vacancy-detail-section">
          <h3>Требования</h3>
          <p>{vacancy.requirements}</p>
        </div>

        <div className="vacancy-detail-actions">
          {!isAdmin && (
            <button className="btn btn-primary" onClick={() => setShowAppForm(true)}>
              Откликнуться
            </button>
          )}
          {isAdmin && (
            <>
              <button className="btn btn-outline" onClick={() => navigate(`/vacancies/${vacancy.id}/edit`)}>
                Редактировать
              </button>
              <button className="btn btn-danger" onClick={() => setShowDelete(true)}>
                Удалить
              </button>
            </>
          )}
        </div>
      </div>

      {applications.length > 0 && (
        <div className="vacancy-applications">
          <h2>Отклики ({applications.length})</h2>
          <div className="applications-list">
            {applications.map(app => (
              <div key={app.id} className="application-mini-card">
                <div className="app-mini-header">
                  <strong>{app.applicantName}</strong>
                  {isAdmin ? (
                    <select
                      value={app.status}
                      onChange={e => handleStatusChange(app.id, e.target.value)}
                      className={`status-select status-${app.status}`}
                    >
                      <option value="pending">На рассмотрении</option>
                      <option value="reviewed">Просмотрено</option>
                      <option value="accepted">Принято</option>
                      <option value="rejected">Отклонено</option>
                    </select>
                  ) : (
                    <span className={`status-badge status-${app.status}`}>{
                      app.status === 'pending' ? 'На рассмотрении' :
                      app.status === 'reviewed' ? 'Просмотрено' :
                      app.status === 'accepted' ? 'Принято' : 'Отклонено'
                    }</span>
                  )}
                </div>
                <p className="app-mini-contact">{app.email} | {app.phone}</p>
                <p className="app-mini-letter">{app.coverLetter}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Удаление вакансии"
        message="Вы уверены, что хотите удалить эту вакансию?"
      />

      <ApplicationForm isOpen={showAppForm} onClose={() => setShowAppForm(false)} />
    </div>
  );
}
