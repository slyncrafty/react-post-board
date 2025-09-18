import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditPostPage = ({ updatePostSubmit }) => {
	const navigate = useNavigate();
	const post = useLoaderData();
	const [formData, setFormData] = useState({
		title: '',
		caption: '',
		image: null,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (post) {
			setFormData({
				title: post.title || '',
				caption: post.caption || '',
				image: null,
			});
		}
	}, [post]);

	const handleChange = (e) => {
		if (e.target.name === 'image') {
			setFormData({
				...formData,
				[e.target.name]: e.target.files[0],
			});
		} else {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await updatePostSubmit({ ...formData, id: post._id });
			toast.success('Post updated successfully!');
			navigate(`/posts/${post._id}`);
		} catch (error) {
			toast.error('Failed to update post');
			console.error('Error updating post:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className='bg-indigo-50'>
			<div className='container m-auto py-10 px-6'>
				<div className='max-w-2xl mx-auto'>
					<div className='bg-white p-8 rounded-lg shadow-md'>
						<h1 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
							Edit Post
						</h1>

						{/* Current Image Preview */}
						{post.image && (
							<div className='mb-6'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Current Image
								</label>
								<div className='aspect-video bg-gray-200 rounded-md overflow-hidden'>
									<img
										src={post.image}
										alt={post.title}
										className='w-full h-full object-cover'
									/>
								</div>
							</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className='mb-6'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Title
								</label>
								<input
									type='text'
									name='title'
									value={formData.title}
									onChange={handleChange}
									required
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
									placeholder='Enter post title'
								/>
							</div>

							<div className='mb-6'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Caption
								</label>
								<textarea
									name='caption'
									value={formData.caption}
									onChange={handleChange}
									required
									rows={6}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
									placeholder='Write your post caption...'
								/>
							</div>

							<div className='mb-6'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									New Image (Optional)
								</label>
								<input
									type='file'
									name='image'
									onChange={handleChange}
									accept='image/*'
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
								/>
								<p className='text-gray-500 text-sm mt-1'>
									Leave empty to keep current image. Supported formats: JPG,
									PNG, SVG, WebP
								</p>
							</div>

							<div className='flex justify-end space-x-4'>
								<button
									type='button'
									onClick={() => navigate(`/posts/${post._id}`)}
									className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors'>
									Cancel
								</button>
								<button
									type='submit'
									disabled={loading}
									className='bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50'>
									{loading ? 'Updating...' : 'Update Post'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EditPostPage;
