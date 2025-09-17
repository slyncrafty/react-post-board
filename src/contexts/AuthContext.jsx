import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			const response = await fetch(`/api/auth/me`, {
				credentials: 'include',
			});

			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
			}
		} catch (error) {
			console.error('Auth check failed:', error);
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		try {
			const response = await fetch(`/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				setUser(data.user);
				return { success: true };
			} else {
				return { success: false, message: data.message };
			}
		} catch (error) {
			return { success: false, message: 'Network error', error };
		}
	};

	const signup = async (name, email, password) => {
		try {
			const response = await fetch(`/api/auth/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				return { success: true };
			} else {
				return { success: false, message: data.message };
			}
		} catch (error) {
			return { success: false, message: 'Network error' };
		}
	};

	const logout = async () => {
		try {
			await fetch(`/api/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			});
			setUser(null);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	const value = {
		user,
		login,
		signup,
		logout,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
