import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVacancies, getCompanyName, getCompanies } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import VacancyCard from '../components/Vacancy/VacancyCard';
import ApplicationForm from '../components/Application/ApplicationForm';
import SearchBar from '../components/Common/SearchBar';
import './HomePage.css';

const popularCategories = [
  'Программист', 'Водитель', 'Продавец', 'Менеджер',
  'Бухгалтер', 'Инженер', 'Дизайнер', 'Повар',
];

export default function HomePage() {
  const [vacancies, setVacancies] = useState([]);
  const [showAppForm, setShowAppForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    setVacancies(getVacancies());
  }, []);

  const recent = [...vacancies]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vacancies?search=${encodeURIComponent(searchQuery)}`);
    }
  }

  function handleCategoryClick(cat) {
    navigate(`/vacancies?search=${encodeURIComponent(cat)}`);
  }

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Поиск работы в&nbsp;вашем городе</h1>
          <p className="hero-subtitle">Тысячи актуальных вакансий от прямых работодателей</p>
          <form className="hero-search" onSubmit={handleSearchSubmit}>
            <svg className="hero-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Профессия, должность или компания"
              className="hero-search-input"
            />
            <button type="submit" className="btn btn-primary hero-search-btn">Найти</button>
          </form>
          <div className="hero-categories">
            {popularCategories.map(cat => (
              <button key={cat} className="category-chip" onClick={() => handleCategoryClick(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="stat-item">
          <span className="stat-num">{vacancies.length}</span>
          <span className="stat-lbl">вакансий</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{getCompanies().length}</span>
          <span className="stat-lbl">компаний</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{vacancies.filter(v => v.type === 'remote').length}</span>
          <span className="stat-lbl">удалённых</span>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Последние вакансии</h2>
            <button className="btn btn-ghost" onClick={() => navigate('/vacancies')}>
              Все вакансии &rarr;
            </button>
          </div>
          <div className="home-vacancy-grid">
            {recent.map(v => (
              <VacancyCard key={v.id} vacancy={v} companyName={getCompanyName(v.companyId)} />
            ))}
          </div>
        </section>
      )}

      <section className="section cta-section">
        <div className="cta-card">
          <div>
            <h2>Хотите откликнуться на вакансию?</h2>
            <p>Отправьте своё резюме прямо сейчас</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => setShowAppForm(true)}>
            Откликнуться
          </button>
        </div>
      </section>

      <ApplicationForm isOpen={showAppForm} onClose={() => setShowAppForm(false)} />
    </div>
  );
}
