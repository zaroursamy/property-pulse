import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
	title: 'Property Pulse | Find perfect Rental',
	description: 'Find your dream rental property',
	keywords: 'rental, find rentals'
};
const MainLayout = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	);
};

export default MainLayout;
