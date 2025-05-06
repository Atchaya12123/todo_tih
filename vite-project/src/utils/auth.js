// utils/auth.js
import {jwtDecode} from 'jwt-decode';

export function isTokenValid() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  console.log(token);
  try {
    const decoded = jwtDecode(token);
    console.log(new Date(decoded.exp * 1000));
     return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

