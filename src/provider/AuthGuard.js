// AuthGuard.js
'use client';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthGuard = ({ children, redirectTo }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default AuthGuard;
