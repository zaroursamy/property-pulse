'use client';
import { ClipLoader } from 'react-spinners';

const LoadingPage = ({ loading }) => {
	const override = {
		display: 'block',
		margin: '100px auto',
		borderColor: 'red'
	};
	return (
		<ClipLoader
			color='green'
			loading={loading}
			cssOverride={override}
			size={150}
			aria-label='Loading Spinner'
			data-testid='loader'
		/>
	);
};

export default LoadingPage;
