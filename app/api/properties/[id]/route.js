import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/:id
export const GET = async (request, { params }) => {
	const idStr = params.id;

	try {
		await connectDB();

		const property = await Property.findById(idStr);

		if (!property) {
			return new Response(`Property ${idStr} not found`, {
				status: 404
			});
		} else {
			return new Response(JSON.stringify(property), {
				status: 200
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(`Something went wrong with property ${idStr}`, {
			status: 500
		});
	}
};
