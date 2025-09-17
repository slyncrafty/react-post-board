import React from 'react';

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

import JobLoader from './components/JobLoader';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App = () => {
	// Add new Job
	const addJob = async (newJob) => {
		const res = await fetch('/api/jobs', {
			method: 'Post',
			header: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newJob),
		});
		return;
	};

	// Delete Job
	const deleteJob = async (id) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: 'DELETE',
		});
	};

	// Update job
	const updateJob = async (job) => {
		const res = await fetch(`/api/jobs/${job.id}`, {
			method: 'PUT',
			header: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(job),
		});
		return;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/jobs' element={<JobsPage />} />
				<Route
					path='/jobs/:id'
					element={<JobPage deleteJob={deleteJob} />}
					loader={JobLoader}
				/>
				<Route
					path='/edit-job/:id'
					element={
						<ProtectedRoute>
							<EditJobPage updateJobSubmit={updateJob} />
						</ProtectedRoute>
					}
					loader={JobLoader}
				/>
				<Route
					path='/add-job'
					element={
						<ProtectedRoute>
							<AddJobPage addJobSubmit={addJob} />
						</ProtectedRoute>
					}
				/>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
