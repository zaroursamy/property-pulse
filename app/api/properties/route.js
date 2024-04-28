import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSession';
import { uploadImagesToCloudinary } from '@/utils/image';
// GET /api/properties
export const GET = async (request) => {
	try {
		await connectDB();

		const properties = await Property.find().sort('-updatedAt').exec();

		return new Response(JSON.stringify(properties), {
			status: 200
		});
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

// POST /api/properties
export const POST = async (request) => {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (sessionUser === null) {
			return new Response({ msg: 'Unauthorized' }, { status: 401 });
		}

		const formData = await request.formData();

		const images = formData
			.getAll('images')
			.filter((img) => img.name !== '');

		const uploadedImages = await uploadImagesToCloudinary(images);

		const property = {
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
			images: uploadedImages,
			owner: sessionUser.userId
		};

		const propertyToAdd = new Property(property);

		await propertyToAdd.save();

		return Response.redirect(
			`${process.env.NEXTAUTH_URL}/properties/${propertyToAdd._id}`
		);
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ msg: 'ko' }), { status: 500 });
	}
};
