import React from 'react';

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import NotFoundPage from './pages/NotFoundPage';
import PostPage from './pages/PostPage';
import AddPostPage from './pages/AddPostPage';
import EditPostPage from './pages/EditPostPage';

import PostLoader from './components/PostLoader';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
	// Add new Post
	const addPost = async (newPost) => {
		const formData = new FormData();
		formData.append('title', newPost.title);
		formData.append('caption', newPost.caption);
		if (newPost.image) {
			formData.append('image', newPost.image);
		}

		const res = await fetch('/api/posts', {
			method: 'POST',
			credentials: 'include',
			body: formData,
		});
		return res.json();
	};

	// Delete Post
	const deletePost = async (id) => {
		const res = await fetch(`/api/posts/${id}`, {
			method: 'DELETE',
			credentials: 'include',
		});
		return res.json();
	};

	// Update post
	const updatePost = async (post) => {
		const formData = new FormData();
		formData.append('title', post.title);
		formData.append('caption', post.caption);
		if (post.image) {
			formData.append('image', post.image);
		}

		const res = await fetch(`/api/posts/${post.id}`, {
			method: 'PUT',
			credentials: 'include',
			body: formData,
		});
		return res.json();
	};

	// Like post
	const likePost = async (id) => {
		const res = await fetch(`/api/posts/like/${id}`, {
			method: 'PUT',
			credentials: 'include',
		});
		return res.json();
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/posts' element={<PostsPage />} />
				<Route
					path='/posts/:id'
					element={<PostPage deletePost={deletePost} likePost={likePost} />}
					loader={PostLoader}
				/>
				<Route
					path='/edit-post/:id'
					element={
						<ProtectedRoute>
							<EditPostPage updatePostSubmit={updatePost} />
						</ProtectedRoute>
					}
					loader={PostLoader}
				/>
				<Route
					path='/add-post'
					element={
						<ProtectedRoute>
							<AddPostPage addPostSubmit={addPost} />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRoute>
							<ProfilePage />
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
