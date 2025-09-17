import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const SignUpPage = () => {
	const { signup } = useAuth();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setError('');
		const result = await signup(name, email, password);
		setSubmitting(false);
		if (result.success) {
			navigate('/login');
		} else {
			setError(result.message || 'Registration failed');
		}
	};

	return (
		<div className='container mx-auto px-4 py-8 max-w-md'>
			<h1 className='text-2xl font-bold mb-6'>Sign Up</h1>
			{error && <div className='mb-4 text-red-600'>{error}</div>}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block mb-1'>Name</label>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className='w-full border rounded px-3 py-2'
					/>
				</div>
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
					disabled={submitting}
					className='bg-indigo-500 text-white px-4 py-2 rounded w-full'>
					{submitting ? 'Signing up...' : 'Sign Up'}
				</button>
			</form>
			<p className='mt-4 text-sm'>
				Already have an account?{' '}
				<Link to='/login' className='text-indigo-600'>
					Login
				</Link>
			</p>
		</div>
	);
};

export default SignUpPage;
