'use client';

import { FadeLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
	const override = {
		display: 'block',
		margin: '100px auto',
		borderColor: 'red'
	};
	return (
		<FadeLoader
			color='green'
			loading={loading}
			cssOverride={override}
			size={150}
			aria-label='Loading Spinner'
		/>
	);
};

export default Spinner;
