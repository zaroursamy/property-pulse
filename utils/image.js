import cloudinary from '@/config/cloudinary';
export const uploadImagesToCloudinary = async (images) => {
	const imgUrls = [];
	for (const img of images) {
		const imgBuffer = await img.arrayBuffer();
		const imgArray = Array.from(new Uint8Array(imgBuffer));
		const imgData = Buffer.from(imgArray);
		const imgBase64 = imgData.toString('base64');

		// Upload images to Cloudinary
		const result = await cloudinary.uploader.upload(
			`data:image/png;base64,${imgBase64}`,
			{ folder: 'propertypulse' }
		);

		console.log(`result = ${result.secure_url}`);
		imgUrls.push(result.secure_url);
	}
	return await Promise.all(imgUrls);
};
