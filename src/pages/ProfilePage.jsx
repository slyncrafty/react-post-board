import React from 'react';
import { Link } from 'react-router-dom';
import PostListings from '../components/PostListings';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
	const { user } = useAuth();

	return (
		<>
			<section>
				<div className='container m-auto py-6 px-6 flex items-center justify-between'>
					<h1 className='text-2xl font-bold'>{user.name}'s Recipes</h1>
					<Link
						to='/add-post'
						className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'>
						Add a New Post
					</Link>
				</div>
			</section>

			<PostListings isHome={false} userId={user?.id || user?._id || null} />
		</>
	);
};

export default ProfilePage;
