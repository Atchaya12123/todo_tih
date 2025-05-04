// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { isTokenValid } from './utils/auth.js';

export default function PrivateRoute({ children }) {
  return isTokenValid() ? children : <Navigate to="/login" replace />;
}
