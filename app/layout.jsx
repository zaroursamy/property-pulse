import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';

export const metadata = {
	title: 'Property Pulse | Find perfect Rental',
	description: 'Find your dream rental property',
	keywords: 'rental, find rentals'
};
import AuthProvider from '@/components/AuthProvider';

const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang='en'>
				<body>
					<Navbar />
					<main>{children}</main>
					<Footer />
					<ToastContainer />
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
