const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
	try {
		if (apiDomain !== null) {
			const res = await fetch(`${apiDomain}/properties`);

			if (!res.ok) {
				throw new Error('Failed to fetch properties');
			}
			return res.json();
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function fetchProperty(id) {
	try {
		if (apiDomain !== null) {
			const res = await fetch(`${apiDomain}/properties/${id}`);

			if (!res.ok) {
				throw new Error(`Failed to fetch property ${id}`);
			}
			return res.json();
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export { fetchProperties, fetchProperty };
