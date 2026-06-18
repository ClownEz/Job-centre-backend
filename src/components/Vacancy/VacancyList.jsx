import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getVacancies, getCompanyName, deleteVacancy } from '../../services/dataService';
import { useAuth } from '../../contexts/AuthContext';
import VacancyCard from './VacancyCard';
import SearchBar from '../Common/SearchBar';
import ConfirmDialog from '../Common/ConfirmDialog';
import './VacancyList.css';

export default function VacancyList() {
  const [vacancies, setVacancies] = useState([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    setVacancies(getVacancies());
  }, []);

  const filtered = useMemo(() => {
    return vacancies.filter(v => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        getCompanyName(v.companyId).toLowerCase().includes(q);
      const matchesType = typeFilter === 'all' || v.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [vacancies, search, typeFilter]);

  function handleDelete(id) {
    deleteVacancy(id);
    setVacancies(getVacancies());
    setDeleteTarget(null);
  }

  return (
    <div className="vacancy-list-page">
      <div className="page-header">
        <h1>Вакансии</h1>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => navigate('/vacancies/new')}>
            + Добавить вакансию
          </button>
        )}
      </div>

      <div className="vacancy-controls">
        <SearchBar value={search} onChange={setSearch} placeholder="Профессия, должность или компания..." />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="filter-select">
          <option value="all">Все типы</option>
          <option value="full-time">Полный день</option>
          <option value="part-time">Частичная занятость</option>
          <option value="remote">Удалённая работа</option>
          <option value="contract">Проектная работа</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>Вакансии не найдены</p>
        </div>
      ) : (
        <div className="vacancy-grid">
          {filtered.map(v => (
            <div key={v.id} className="vacancy-card-wrapper">
              <VacancyCard vacancy={v} companyName={getCompanyName(v.companyId)} />
              {isAdmin && (
                <div className="vacancy-card-actions">
                  <button className="btn btn-sm btn-outline" onClick={() => navigate(`/vacancies/${v.id}/edit`)}>
                    Редактировать
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => setDeleteTarget(v.id)}>
                    Удалить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget)}
        title="Удаление вакансии"
        message="Вы уверены, что хотите удалить эту вакансию? Все отклики на неё также будут удалены."
      />
    </div>
  );
}
