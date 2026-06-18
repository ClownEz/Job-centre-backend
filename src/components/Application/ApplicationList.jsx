import { useState, useEffect, useMemo } from 'react';
import {
  getApplications, deleteApplication, updateApplication,
  getVacancyTitle, getVacancies,
} from '../../services/dataService';
import { useAuth } from '../../contexts/AuthContext';
import ApplicationCard from './ApplicationCard';
import SearchBar from '../Common/SearchBar';
import ConfirmDialog from '../Common/ConfirmDialog';
import './ApplicationList.css';

export default function ApplicationList() {
  const { isAdmin, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [vacancies] = useState(getVacancies);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const all = getApplications();
    const filtered = isAdmin ? all : all.filter(a => a.email === user.email);
    setApplications(filtered);
  }, [isAdmin, user]);

  const filtered = useMemo(() => {
    return applications.filter(a => {
      const title = getVacancyTitle(a.vacancyId);
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        a.applicantName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        title.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  function handleDelete(id) {
    deleteApplication(id);
    const all = getApplications();
    setApplications(isAdmin ? all : all.filter(a => a.email === user.email));
    setDeleteTarget(null);
  }

  function handleStatusChange(id, status) {
    updateApplication(id, { status });
    const all = getApplications();
    setApplications(isAdmin ? all : all.filter(a => a.email === user.email));
  }

  return (
    <div className="application-list-page">
      <div className="page-header">
        <h1>{isAdmin ? 'Все отклики' : 'Мои отклики'}</h1>
      </div>

      <div className="application-controls">
        <SearchBar value={search} onChange={setSearch} placeholder="Поиск по имени, email или вакансии..." />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="filter-select">
          <option value="all">Все статусы</option>
          <option value="pending">На рассмотрении</option>
          <option value="reviewed">Просмотрено</option>
          <option value="accepted">Принято</option>
          <option value="rejected">Отклонено</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>Отклики не найдены</p>
        </div>
      ) : (
        <div className="application-list">
          {filtered.map(a => (
            <ApplicationCard
              key={a.id}
              application={a}
              vacancyTitle={getVacancyTitle(a.vacancyId)}
              onStatusChange={isAdmin ? handleStatusChange : null}
              onDelete={isAdmin ? setDeleteTarget : null}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget)}
        title="Удаление отклика"
        message="Вы уверены, что хотите удалить этот отклик?"
      />
    </div>
  );
}
