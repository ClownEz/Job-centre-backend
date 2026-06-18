import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVacancies, addApplication } from '../../services/dataService';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../Common/Modal';
import './ApplicationForm.css';

const initialForm = {
  vacancyId: '',
  applicantName: '',
  email: '',
  phone: '',
  coverLetter: '',
};

export default function ApplicationForm({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setVacancies(getVacancies());
      setForm({
        vacancyId: '',
        applicantName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        coverLetter: '',
      });
      setErrors({});
    }
  }, [isOpen, user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.vacancyId) errs.vacancyId = 'Выберите вакансию';
    if (!form.applicantName.trim()) errs.applicantName = 'Введите имя';
    if (!form.email.trim()) {
      errs.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Некорректный формат email';
    }
    if (!form.phone.trim()) {
      errs.phone = 'Введите телефон';
    }
    if (!form.coverLetter.trim()) errs.coverLetter = 'Напишите сопроводительное письмо';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addApplication({
      ...form,
      vacancyId: Number(form.vacancyId),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    });

    onClose();
    navigate('/applications');
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Откликнуться на вакансию">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Вакансия</label>
          <select name="vacancyId" value={form.vacancyId} onChange={handleChange}>
            <option value="">Выберите вакансию</option>
            {vacancies.map(v => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
          {errors.vacancyId && <span className="form-error">{errors.vacancyId}</span>}
        </div>

        <div className="form-group">
          <label>ФИО</label>
          <input type="text" name="applicantName" value={form.applicantName} onChange={handleChange} />
          {errors.applicantName && <span className="form-error">{errors.applicantName}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="+7 (999) 123-45-67" />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Сопроводительное письмо</label>
          <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} rows={4} />
          {errors.coverLetter && <span className="form-error">{errors.coverLetter}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Отмена</button>
          <button type="submit" className="btn btn-primary">Отправить</button>
        </div>
      </form>
    </Modal>
  );
}
