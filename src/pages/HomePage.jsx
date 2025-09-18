import React from 'react';

import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import PostListings from '../components/PostListings';
import ViewAllPosts from '../components/ViewAllPosts';

const HomePage = () => {
	return (
		<>
			<Hero
				title={'Share your Secret Recipes'}
				subtitle={'Find the secret recipes for your favorite dishes'}
			/>
			<HomeCards />
			<PostListings isHome={true} />
			<ViewAllPosts />
		</>
	);
};

export default HomePage;
