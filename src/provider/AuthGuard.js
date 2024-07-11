// AuthGuard.js
'use client';
import React from 'react';
// import { Navigate } from 'react-router-dom';
import { redirect } from 'next/navigation';
import { useAuth } from './AuthContext';

const AuthGuard = ({ children, redirectTo }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    // return <Navigate to={redirectTo} />;
    redirect(redirectTo);
  }

  return children;
};

export default AuthGuard;
