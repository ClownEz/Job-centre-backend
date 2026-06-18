import { mockCompanies, mockVacancies, mockApplications } from '../data/mockData';

const KEYS = {
  companies: 'jobsearch_companies',
  vacancies: 'jobsearch_vacancies',
  applications: 'jobsearch_applications',
};

function load(key, mockData) {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [...mockData];
    }
  }
  localStorage.setItem(key, JSON.stringify(mockData));
  return [...mockData];
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadCompanies() {
  return load(KEYS.companies, mockCompanies);
}

export function saveCompanies(companies) {
  save(KEYS.companies, companies);
}

export function loadVacancies() {
  return load(KEYS.vacancies, mockVacancies);
}

export function saveVacancies(vacancies) {
  save(KEYS.vacancies, vacancies);
}

export function loadApplications() {
  return load(KEYS.applications, mockApplications);
}

export function saveApplications(applications) {
  save(KEYS.applications, applications);
}

export function clearAllData() {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}
