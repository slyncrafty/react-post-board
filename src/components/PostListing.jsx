import React from 'react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostListing = ({ post }) => {
	const [showFullCaption, setShowFullCaption] = useState(false);
	let caption = post.caption;

	if (!showFullCaption && caption.length > 90) {
		caption = caption.substring(0, 90) + '...';
	}

	return (
		<div className='bg-white rounded-xl shadow-md relative overflow-hidden'>
			{/* Post Image */}
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

			<div className='p-4'>
				<div className='mb-4'>
					<h3 className='text-xl font-bold mb-2'>{post.title}</h3>
					<div className='text-gray-600 text-sm mb-2'>
						Posted by: {post.user?.name || 'Loading...'}
					</div>
					<div className='text-gray-500 text-xs'>
						{new Date(post.createdAt).toLocaleDateString()}
					</div>
				</div>

				<div className='mb-4'>
					<p className='text-gray-700'>{caption}</p>
					{post.caption.length > 90 && (
						<button
							onClick={() => setShowFullCaption((prevState) => !prevState)}
							className='text-indigo-500 hover:text-indigo-600 text-sm mt-1'>
							{showFullCaption ? 'Show less' : 'Show more'}
						</button>
					)}
				</div>

				<div className='border border-gray-100 mb-4'></div>

				<div className='flex flex-col lg:flex-row justify-between items-center'>
					<div className='flex items-center text-gray-600 mb-3 lg:mb-0'>
						<FaRegHeart className='mr-1' />
						<span>{post.likes || 0} likes</span>
					</div>
					<Link
						to={`/posts/${post._id}`}
						className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm transition-colors'>
						Read More
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PostListing;
