import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSession';
// GET /api/properties/:id
export const GET = async (request, { params }) => {
	const propertyId = params.id;

	try {
		await connectDB();

		const property = await Property.findById(propertyId);

		if (!property) {
			return new Response(`Property ${propertyId} not found`, {
				status: 404
			});
		} else {
			return new Response(JSON.stringify(property), {
				status: 200
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(
			`Something went wrong with property ${propertyId}`,
			{
				status: 500
			}
		);
	}
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
	const propertyId = params.id;

	try {
		const sessionUser = await getSessionUser();

		// Check for session (if not, everybody can delete)
		if (!(sessionUser && sessionUser.userId)) {
			return new Response('Session or user ID required', { status: 401 });
		}

		await connectDB();

		const property = await Property.findOneAndDelete({
			_id: propertyId,
			owner: sessionUser.userId
		});

		if (!property) {
			return new Response(`Property ${propertyId} not deleted`, {
				status: 404
			});
		} else {
			return new Response(JSON.stringify(property), {
				status: 200
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(
			`Something went wrong by deleting property ${propertyId}`,
			{
				status: 500
			}
		);
	}
};
