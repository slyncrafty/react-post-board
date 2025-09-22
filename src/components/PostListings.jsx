import React from 'react';
import { useState, useEffect } from 'react';
import PostListing from './PostListing';
import Spinner from './Spinner';

const PostListings = ({ isHome = false, userId = null }) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch('/api/posts');
				if (!res.ok) {
					throw new Error(`Failed to fetch posts: ${res.status}`);
				}
				const data = await res.json();
				const filtered = userId
					? data.filter(
							(p) => p.user && (p.user._id === userId || p.user === userId)
					  )
					: data;
				const limited = isHome ? filtered.slice(0, 3) : filtered;
				setPosts(limited);
			} catch (err) {
				console.log('Error fetching posts', err);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, [isHome, userId]);

	return (
		<section className='bg-blue-50 px-4 py-10'>
			<div className='container-xl lg:container m-auto'>
				<h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
					{isHome ? 'Recent Recipes' : 'Browse Recipes'}
				</h2>
				{loading ? (
					<Spinner loading={loading} />
				) : (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{posts.map((post) => (
							<PostListing key={post._id} post={post} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default PostListings;
