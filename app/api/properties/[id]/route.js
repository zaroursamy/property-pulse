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
			`Something went wrong getting property ${propertyId}`,
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
		}).exec();

		if (!property) {
			return new Response(`Property ${propertyId} not deleted`, {
				status: 404
			});
		} else {
			return Response.redirect(
				`${process.env.NEXTAUTH_URL}/properties/${propertyToAdd._id}`
			);
		}
	} catch (error) {
		console.log(error);
		return new Response(
			`Something went wrong deleting property ${propertyId}`,
			{
				status: 500
			}
		);
	}
};

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
	const propertyId = params.id;

	console.log(`Trying to update property ${propertyId}`);

	try {
		const sessionUser = await getSessionUser();

		console.log(`userId = ${sessionUser.userId}`);

		if (!sessionUser || !sessionUser.userId) {
			return new Response(`Session or userId required`, { status: 401 });
		}
		const { userId } = sessionUser;

		await connectDB();
		const formData = await request.formData();
		const updatedProperty = {
			type: formData.get('type'),
			name: formData.get('name'),
			description: formData.get('description'),
			location: {
				street: formData.get('location.street'),
				city: formData.get('location.city'),
				zipcode: formData.get('location.zipcode')
			},
			beds: formData.get('beds'),
			baths: formData.get('baths'),
			square_feet: formData.get('square_feet'),
			amenities: formData.getAll('amenities'),
			rates: {
				weekly: formData.get('rates.weekly'),
				monthly: formData.get('rates.monthly'),
				nightly: formData.get('rates.nightly')
			},
			seller_info: {
				name: formData.get('seller_info.name'),
				email: formData.get('seller_info.email'),
				phone: formData.get('seller_info.phone')
			},
			owner: userId
		};

		const property = await Property.findOneAndUpdate(
			{ _id: propertyId, owner: userId },
			updatedProperty
		);

		if (!property) {
			return new Response(`Property ${propertyId} can not be updated`, {
				status: 404
			});
		} else {
			return new Response(`Property succesfully updated`, {
				status: 200
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(
			`Something went wrong updating property ${propertyId}`,
			{
				status: 500
			}
		);
	}
};
