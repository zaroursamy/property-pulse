import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/user/:id
export const GET = async (request, { params }) => {
	console.log(params);
	const userId = params.id;

	if (!userId) {
		return new Response('User id is required', { status: 400 });
	}

	try {
		await connectDB();

		const properties = await Property.find({ owner: userId }).exec();

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.error(`Failed fetch properties from user ${userId}`, error);
		return new Response(`Failed fetch properties from user ${userId}`, {
			status: 500
		});
	}
};
