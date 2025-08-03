import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const login = (token, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

export const getRole = () => {
  return localStorage.getItem('role');
};

export const useAuth = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error("Invalid token:", e);
        logout();
      }
    }
  }, []);

  return { user };
};
