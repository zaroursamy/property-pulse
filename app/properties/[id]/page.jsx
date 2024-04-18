'use client';

import PropertyCard from '@/components/PropertyCard';
import { useEffect, useState } from 'react';
import { fetchProperty } from '@/utils/requests';

const PropertyPage = ({ params }) => {
	const { id } = params;
	const [property, setProperty] = useState(null);

	useEffect(() => {
		fetchProperty(id).then((json) => {
			setProperty(json);
		});
	}, [id]);

	return property && <PropertyCard property={property}></PropertyCard>;
};

export default PropertyPage;
