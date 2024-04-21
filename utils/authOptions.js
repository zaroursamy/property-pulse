import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		// Invoked on successful signin
		async signIn({ user, account, profile, email, credentials }) {
			try {
				const connected = await connectDB();
				if (connected) {
					const fetchedUser = await User.findOne({
						email: profile.email
					}).exec();

					console.log(`fetchedUser=${fetchedUser}`);

					if (!fetchedUser) {
						console.log(
							`Profile ${profile.email} doesn't exist, creating it ...`
						);

						const truncatedUsername = profile.name
							.replace(' ', '')
							.toLowerCase()
							.slice(0, 20);

						const createUser = new User({
							email: profile.email,
							username: truncatedUsername,
							image: profile.picture
						});

						const saveUser = await createUser.save();

						console.log(`Created user: ${saveUser}`);
						return true;
					}

					return true;
				} else {
					console.log('Not connected to MongoDB');
					return false;
				}
			} catch (error) {
				console.error(`Error while signIn`, error);
				throw new Error(error);
			}
		},

		// modifiy session object
		async session({ session }) {
			// get user from db
			const fetchedUser = await User.findOne({
				email: session.user.email
			});

			if (fetchedUser) {
				session.user.id = fetchedUser._id.toString();
			}

			return session;
		}
	}
};
