import { useNavigate } from 'react-router-dom';
import './VacancyCard.css';

const typeLabels = {
  'full-time': 'Полный день',
  'part-time': 'Частичная занятость',
  'remote': 'Удалённая работа',
  'contract': 'Проектная работа',
};

export default function VacancyCard({ vacancy, companyName }) {
  const navigate = useNavigate();

  return (
    <div className="vacancy-card" onClick={() => navigate(`/vacancies/${vacancy.id}`)}>
      <div className="vacancy-card-body">
        <div className="vacancy-card-top">
          <h3>{vacancy.title}</h3>
          <span className={`vacancy-type type-${vacancy.type}`}>
            {typeLabels[vacancy.type] || vacancy.type}
          </span>
        </div>
        <p className="vacancy-company">{companyName}</p>
        <div className="vacancy-salary">{vacancy.salary}</div>
        <p className="vacancy-desc">{vacancy.description}</p>
        <div className="vacancy-meta">
          <span className="meta-location">{vacancy.location}</span>
          <span className="meta-category">{vacancy.category}</span>
          <span className="meta-date">{vacancy.createdAt}</span>
        </div>
      </div>
    </div>
  );
}
