import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import VacancyList from './components/Vacancy/VacancyList';
import VacancyDetail from './components/Vacancy/VacancyDetail';
import VacancyForm from './components/Vacancy/VacancyForm';
import CompanyDetail from './components/Company/CompanyDetail';
import ApplicationList from './components/Application/ApplicationList';
import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vacancies" element={<VacancyList />} />
            <Route path="/vacancies/:id" element={<VacancyDetail />} />
            <Route path="/vacancies/:id/edit" element={<AdminRoute><VacancyForm /></AdminRoute>} />
            <Route path="/vacancies/new" element={<AdminRoute><VacancyForm /></AdminRoute>} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/applications" element={<ApplicationList />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
