import {
  loadCompanies, saveCompanies,
  loadVacancies, saveVacancies,
  loadApplications, saveApplications,
} from './storageService';

let companies = loadCompanies();
let vacancies = loadVacancies();
let applications = loadApplications();

function persist() {
  saveCompanies(companies);
  saveVacancies(vacancies);
  saveApplications(applications);
}

let nextCompanyId = Math.max(0, ...companies.map(c => c.id)) + 1;
let nextVacancyId = Math.max(0, ...vacancies.map(v => v.id)) + 1;
let nextApplicationId = Math.max(0, ...applications.map(a => a.id)) + 1;

export function getCompanies() {
  return [...companies];
}

export function getCompanyById(id) {
  return companies.find(c => c.id === Number(id)) || null;
}

export function addCompany(data) {
  const company = { ...data, id: nextCompanyId++ };
  companies = [...companies, company];
  persist();
  return company;
}

export function updateCompany(id, data) {
  companies = companies.map(c =>
    c.id === Number(id) ? { ...c, ...data } : c
  );
  persist();
  return getCompanyById(id);
}

export function deleteCompany(id) {
  const hasVacancies = vacancies.some(v => v.companyId === Number(id));
  if (hasVacancies) return false;
  companies = companies.filter(c => c.id !== Number(id));
  persist();
  return true;
}

export function getVacancies() {
  return [...vacancies];
}

export function getVacancyById(id) {
  return vacancies.find(v => v.id === Number(id)) || null;
}

export function getVacanciesByCompany(companyId) {
  return vacancies.filter(v => v.companyId === Number(companyId));
}

export function addVacancy(data) {
  const vacancy = { ...data, id: nextVacancyId++ };
  vacancies = [...vacancies, vacancy];
  persist();
  return vacancy;
}

export function updateVacancy(id, data) {
  vacancies = vacancies.map(v =>
    v.id === Number(id) ? { ...v, ...data } : v
  );
  persist();
  return getVacancyById(id);
}

export function deleteVacancy(id) {
  applications = applications.filter(a => a.vacancyId !== Number(id));
  vacancies = vacancies.filter(v => v.id !== Number(id));
  persist();
  return true;
}

export function getApplications() {
  return [...applications];
}

export function getApplicationById(id) {
  return applications.find(a => a.id === Number(id)) || null;
}

export function getApplicationsByVacancy(vacancyId) {
  return applications.filter(a => a.vacancyId === Number(vacancyId));
}

export function addApplication(data) {
  const application = { ...data, id: nextApplicationId++ };
  applications = [...applications, application];
  persist();
  return application;
}

export function updateApplication(id, data) {
  applications = applications.map(a =>
    a.id === Number(id) ? { ...a, ...data } : a
  );
  persist();
  return getApplicationById(id);
}

export function deleteApplication(id) {
  applications = applications.filter(a => a.id !== Number(id));
  persist();
  return true;
}

export function getCompanyName(companyId) {
  const company = companies.find(c => c.id === Number(companyId));
  return company ? company.name : 'Неизвестная компания';
}

export function getVacancyTitle(vacancyId) {
  const vacancy = vacancies.find(v => v.id === Number(vacancyId));
  return vacancy ? vacancy.title : 'Неизвестная вакансия';
}
