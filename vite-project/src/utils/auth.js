// utils/auth.js
import {jwtDecode} from 'jwt-decode';

export function isTokenValid() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    return exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

