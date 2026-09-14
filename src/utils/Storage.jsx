const USERS_KEY = 'verso_users';
const CURRENT_USER_KEY = 'verso_current_user';

export function getUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);

    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}