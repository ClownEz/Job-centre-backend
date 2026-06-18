import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getVacancyById, addVacancy, updateVacancy, getCompanies,
} from '../../services/dataService';
import './VacancyForm.css';

const initialForm = {
  companyId: '',
  title: '',
  description: '',
  requirements: '',
  salary: '',
  location: '',
  type: 'full-time',
  category: 'IT',
};

export default function VacancyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setCompanies(getCompanies());
    if (isEdit) {
      const v = getVacancyById(id);
      if (v) {
        setForm({
          companyId: v.companyId,
          title: v.title,
          description: v.description,
          requirements: v.requirements,
          salary: v.salary,
          location: v.location,
          type: v.type,
          category: v.category,
        });
      }
    }
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const errs = {};
    if (!form.companyId) errs.companyId = 'Выберите компанию';
    if (!form.title.trim()) errs.title = 'Название обязательно';
    if (!form.description.trim()) errs.description = 'Описание обязательно';
    if (!form.requirements.trim()) errs.requirements = 'Укажите требования';
    if (!form.salary.trim()) errs.salary = 'Укажите зарплату';
    if (!form.location.trim()) errs.location = 'Укажите локацию';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const data = {
      ...form,
      companyId: Number(form.companyId),
      createdAt: isEdit ? undefined : new Date().toISOString().split('T')[0],
    };

    if (isEdit) {
      updateVacancy(id, data);
    } else {
      addVacancy(data);
    }
    navigate('/vacancies');
  }

  return (
    <div className="vacancy-form-page">
      <button className="btn btn-ghost" onClick={() => navigate('/vacancies')}>
        &larr; Назад к вакансиям
      </button>

      <div className="form-card">
        <h1>{isEdit ? 'Редактировать вакансию' : 'Новая вакансия'}</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Компания</label>
            <select name="companyId" value={form.companyId} onChange={handleChange}>
              <option value="">Выберите компанию</option>
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.companyId && <span className="form-error">{errors.companyId}</span>}
          </div>

          <div className="form-group">
            <label>Название вакансии</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Тип занятости</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="full-time">Полный день</option>
                <option value="part-time">Частичная занятость</option>
                <option value="remote">Удалённая работа</option>
                <option value="contract">Контракт</option>
              </select>
            </div>

            <div className="form-group">
              <label>Категория</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="IT">IT</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Финансы">Финансы</option>
                <option value="Дизайн">Дизайн</option>
                <option value="Промышленность">Промышленность</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Зарплата</label>
              <input type="text" name="salary" value={form.salary} onChange={handleChange} placeholder="200 000 - 300 000 ₽" />
              {errors.salary && <span className="form-error">{errors.salary}</span>}
            </div>

            <div className="form-group">
              <label>Локация</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Москва" />
              {errors.location && <span className="form-error">{errors.location}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Описание</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Требования</label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3} />
            {errors.requirements && <span className="form-error">{errors.requirements}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/vacancies')}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
