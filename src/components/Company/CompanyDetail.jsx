import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById, getVacanciesByCompany } from '../../services/dataService';
import VacancyCard from '../Vacancy/VacancyCard';
import './CompanyDetail.css';

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const c = getCompanyById(id);
    if (c) {
      setCompany(c);
      setVacancies(getVacanciesByCompany(id));
    }
  }, [id]);

  if (!company) {
    return <div className="empty-state">Компания не найдена</div>;
  }

  return (
    <div className="company-detail-page">
      <button className="btn btn-ghost" onClick={() => navigate(-1)}>
        &larr; Назад
      </button>

      <div className="company-detail-card">
        <div className="company-detail-header">
          <div className="company-detail-avatar">{company.name.charAt(0)}</div>
          <div>
            <h1>{company.name}</h1>
            <p className="company-detail-tag">{company.industry}</p>
          </div>
        </div>

        <div className="company-info-grid">
          <div className="company-info-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{company.location}</span>
          </div>
          <div className="company-info-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span>{company.phone}</span>
          </div>
          <div className="company-info-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a>
          </div>
        </div>

        <div className="company-detail-section">
          <h3>О компании</h3>
          <p>{company.description}</p>
        </div>
      </div>

      {vacancies.length > 0 && (
        <div className="company-vacancies-section">
          <h2>Вакансии компании ({vacancies.length})</h2>
          <div className="company-vacancies-grid">
            {vacancies.map(v => (
              <VacancyCard key={v.id} vacancy={v} companyName={company.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
