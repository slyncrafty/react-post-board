import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const PostPage = ({ deletePost, likePost }) => {
	const navigate = useNavigate();
	const post = useLoaderData();
	const { user } = useAuth();
	const [likes, setLikes] = useState(post.likes || 0);
	const isOwner =
		user && post && post.user && post.user._id?.toString() === user.id;

	const onDeleteClick = async (postId) => {
		const confirm = window.confirm('Are you sure to delete this post?');
		if (!confirm) return;
		await deletePost(postId);
		toast.success('Post deleted successfully');
		navigate('/posts');
	};

	const onLikeClick = async (postId) => {
		if (!user) {
			toast.error('Please log in to like posts');
			return;
		}
		try {
			const result = await likePost(postId);
			setLikes(result.likes);
		} catch {
			toast.error('Failed to like post');
		}
	};

	return (
		<>
			{/* <!-- Go Back --> */}
			<section>
				<div className='container m-auto py-6 px-6'>
					<Link
						to='/posts'
						className='text-indigo-500 hover:text-indigo-600 flex items-center'>
						<FaArrowLeft className='mr-2' /> Back to Posts
					</Link>
				</div>
			</section>

			<section className='bg-indigo-50'>
				<div className='container m-auto py-10 px-6'>
					<div className='max-w-4xl mx-auto'>
						{/* <!-- Main Post Content --> */}
						<div className='bg-white rounded-lg shadow-md overflow-hidden'>
							{/* <!-- Post Image --> */}
							<div className='aspect-video bg-gray-200'>
								<img
									src={post.image || '/logo.png'}
									alt={post.title}
									className='w-full h-full object-cover'
									onError={(e) => {
										e.currentTarget.src = '/logo.png';
										e.currentTarget.onerror = null;
									}}
								/>
							</div>

							{/* <!-- Post Content --> */}
							<div className='p-6'>
								<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

								{/* <!-- Author and Date --> */}
								<div className='flex items-center justify-between mb-6 text-gray-600'>
									<div className='flex items-center'>
										<span className='font-semibold'>Posted by: </span>
										<span className='ml-2'>
											{post.user?.name || 'Loading...'}
										</span>
									</div>
									<div className='text-sm'>
										{new Date(post.createdAt).toLocaleDateString()}
									</div>
								</div>

								{/* <!-- Caption/Content --> */}
								<div className='mb-6'>
									<p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
										{post.caption}
									</p>
								</div>

								{/* <!-- Like Button and Count --> */}
								<div className='flex items-center justify-between border-t pt-4'>
									<button
										onClick={() => onLikeClick(post._id)}
										className='flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors'>
										{user ? (
											<FaHeart className='text-red-500' />
										) : (
											<FaRegHeart />
										)}
										<span>{likes} likes</span>
									</button>

									{/* <!-- Manage Actions (Owner Only) --> */}
									{isOwner && (
										<div className='flex space-x-3'>
											<Link
												to={`/edit-post/${post._id}`}
												className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'>
												Edit Post
											</Link>
											<button
												onClick={() => onDeleteClick(post._id)}
												className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'>
												Delete Post
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default PostPage;
