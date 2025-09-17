import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
	const linkClassList =
		'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';
	const linkClass = ({ isActive }) =>
		isActive ? linkClassList + ' bg-black' : linkClassList;

	const { user, logout } = useAuth();

	return (
		<nav className='bg-indigo-700 border-b border-indigo-500'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='flex h-20 items-center justify-between'>
					<div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
						{/* <!-- Logo --> */}
						<NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
							<img className='h-10 w-auto' src={logo} alt='React Jobs' />
							<span className='hidden md:block text-white text-2xl font-bold ml-2'>
								React Jobs
							</span>
						</NavLink>
						<div className='md:ml-auto'>
							<div className='flex space-x-2 items-center'>
								<NavLink to='/' className={linkClass}>
									Home
								</NavLink>
								<NavLink to='/jobs' className={linkClass}>
									Job
								</NavLink>
								{user ? (
									<>
										<NavLink to='/add-job' className={linkClass}>
											Add Job
										</NavLink>
										<button
											onClick={logout}
											className='text-white hover:bg-yellow-900 hover:text-white rounded-md px-3 py-2'>
											Logout
										</button>
									</>
								) : (
									<>
										<NavLink to='/login' className={linkClass}>
											Login
										</NavLink>
										<NavLink to='/signup' className={linkClass}>
											Sign Up
										</NavLink>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav >
	);
};

export default Navbar;
