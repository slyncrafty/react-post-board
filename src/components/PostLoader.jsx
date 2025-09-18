import { useParams } from 'react-router-dom';

const PostLoader = async ({ params }) => {
	try {
		const response = await fetch(`/api/posts/${params.id}`);
		if (!response.ok) {
			throw new Error('Post not found');
		}
		const post = await response.json();
		return post;
	} catch (error) {
		console.error('Error loading post:', error);
		throw new Error('Failed to load post');
	}
};

export default PostLoader;
