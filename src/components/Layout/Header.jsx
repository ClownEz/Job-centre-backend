import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <NavLink to="/" className="logo">
            <span className="logo-icon">J</span>
            <span className="logo-text">JobSearch</span>
          </NavLink>
          <nav className="nav">
            <NavLink to="/vacancies" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Вакансии
            </NavLink>
            <NavLink to="/applications" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Отклики
            </NavLink>
          </nav>
        </div>
        <div className="header-right">
          {isAdmin && (
            <NavLink to="/vacancies/new" className="btn btn-primary btn-sm">
              + Вакансия
            </NavLink>
          )}
          <div className="user-info">
            <span className="user-avatar">{user.name.charAt(0)}</span>
            <span className="user-name">{user.name}</span>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Выйти</button>
        </div>
      </div>
    </header>
  );
}
