import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [submit, setSubmit] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmit(true);
		setError('');
		const res = await login(email, password);
		setSubmit(false);
		if (res.success) {
			navigate(from, { replace: true });
		} else {
			setError(res.message || 'Login failed');
		}
	};
	return (
		<div className='container mx-auto px-4 py-8 max-w-md'>
			<h1 className='text-2xl font-bold mb-6'>Login</h1>
			{error && <div className='mb-4 text-red-600'>{error}</div>}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block mb-1'>Email</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className='w-full border rounded px-3 py-2'
					/>
				</div>
				<div>
					<label className='block mb-1'>Password</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className='w-full border rounded px-3 py-2'
					/>
				</div>
				<button
					type='submit'
					disabled={submit}
					className='bg-indigo-500 text-white px-4 py-2 rounded w-full'>
					{submit ? 'Logging in...' : 'Login'}
				</button>
			</form>
			<p className='mt-4 text-sm'>
				Don&#39;t have an account?{' '}
				<Link to='/signup' className='text-indigo-500'>
					Sign Up
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
