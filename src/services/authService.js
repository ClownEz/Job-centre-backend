const mockUsers = [
  {
    id: 1,
    name: 'Иван Петров',
    email: 'user@test.com',
    password: 'user123',
    role: 'user',
    phone: '+7 (999) 111-22-33',
  },
  {
    id: 2,
    name: 'Администратор',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    phone: '+7 (999) 000-00-00',
  },
];

const AUTH_KEY = 'jobsearch_current_user';

export function login(email, password) {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Неверный email или пароль');
  }
  const session = { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'admin';
}
