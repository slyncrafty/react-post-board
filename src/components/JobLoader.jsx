import React from 'react';

// react-router
const JobLoader = async ({ params }) => {
	const res = await fetch(`/api/jobs/${params.id}`);
	const data = await res.json();
	return data;
};
export default JobLoader;
