'use client';

import PropertyCard from '@/components/PropertyCard';
import { useEffect, useState } from 'react';
import { fetchProperty } from '@/utils/requests';
import { useParams } from 'next/navigation';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyBackBtn from '@/components/PropertyBackBtn';
import PropertyInfo from '@/components/PropertyInfo';
import Spinner from '@/components/Spinner';
import PropertyImages from '@/components/PropertyImages';

const PropertyPage = () => {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPropertyFromDB = async () => {
			if (id === null) return;

			try {
				const fetchedProperty = await fetchProperty(id);
				setProperty(fetchedProperty);
			} catch (error) {
				console.error('Failed fetch property');
			} finally {
				setLoading(false);
			}
		};

		property === null && fetchPropertyFromDB();
	}, [id, property]);

	if (!property && !loading) {
		return (
			<h1 className='text-center text-2xl font-bold mt-10'>
				Property not found
			</h1>
		);
	}

	return (
		<>
			{loading && <Spinner loading={loading} />}
			{!loading && property && (
				<>
					<PropertyHeaderImage image={property.images[0]} />
					<PropertyBackBtn />
					<PropertyInfo property={property} loading={loading} />
					<PropertyImages images={property.images} />
				</>
			)}
		</>
	);
};

export default PropertyPage;
