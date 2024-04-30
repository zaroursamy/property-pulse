const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
	try {
		if (apiDomain !== null) {
			const res = await fetch(`${apiDomain}/properties`, {
				cache: 'no-store'
			});

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

async function fetchUserProperties(userId) {
	console.log(`fetchUserProperties for userId=${userId}`);
	try {
		if (apiDomain !== null) {
			const res = await fetch(`${apiDomain}/properties/user/${userId}`);

			if (!res.ok) {
				throw new Error(
					`Failed to fetch properties for user ${userId}`
				);
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

			console.log(`res=${res}`);

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

async function deleteProperty(id) {
	console.log(`Delete property ${id}`);
	try {
		if (apiDomain !== null) {
			const res = await fetch(`${apiDomain}/properties/${id}`, {
				method: 'DELETE'
			});

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

export { fetchProperties, fetchProperty, fetchUserProperties, deleteProperty };
