import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) return null;
	if (!user) return <Navigate to='/login' replace state={{ from: location }} />;

	return children;
};

export default ProtectedRoute;
