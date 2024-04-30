'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import { fetchUserProperties, deleteProperty } from '@/utils/requests';
import Spinner from '@/components/Spinner';
const ProfilePage = () => {
	const { data: session } = useSession();
	const profileImage = session?.user?.image;
	const profileName = session?.user?.name;
	const profileEmail = session?.user?.email;
	const userId = session?.user?.id;

	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	const deletePropertyFromId = async (id) => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this property ?'
		);

		if (!confirmed) {
			return;
		}
		const deletedProperty = await deleteProperty(id);

		console.log(
			`Deleted property = ${deletedProperty}. Updating state ...`
		);

		if (deletedProperty) {
			const updatedProperties = properties.filter(
				(property) => property._id !== deletedProperty._id
			);
			setProperties(updatedProperties);
		}
	};

	useEffect(() => {
		const fetchProperties = async () => {
			const fetchedProperties = await fetchUserProperties(userId);
			setProperties(fetchedProperties);
			setLoading(false);
		};

		session && fetchProperties();
	}, [session]);

	return (
		<section className='bg-emerald-50'>
			<div className='container m-auto py-24'>
				<div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
					<h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
					<div className='flex flex-col md:flex-row'>
						<div className='md:w-1/4 mx-20 mt-10'>
							<div className='mb-4'>
								<Image
									className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
									src={profileImage || profileDefault}
									alt='User'
									width={0}
									height={0}
									sizes='100vw'
									priority={true}
								/>
							</div>
							<h2 className='text-2xl mb-4'>
								<span className='font-bold block'>Name: </span>{' '}
								{profileName}
							</h2>
							<h2 className='text-2xl'>
								<span className='font-bold block'>Email: </span>{' '}
								{profileEmail}
							</h2>
						</div>

						<div className='md:w-3/4 md:pl-4'>
							<h2 className='text-xl font-semibold mb-4'>
								Your Listings
							</h2>
							{!loading &&
								(!properties || properties.length === 0) && (
									<h3>No properties found</h3>
								)}
							{loading ? (
								<Spinner />
							) : (
								properties.map((property) => {
									return (
										<div
											key={property._id}
											className='mb-10'
										>
											<Link
												href={`/properties/${property._id}`}
											>
												<Image
													className='h-32 w-full rounded-md object-cover'
													src={property.images[0]}
													alt={property._id}
													width={0}
													height={0}
													sizes='100vw'
													priority={true}
												/>
											</Link>
											<div className='mt-2'>
												<p className='text-lg font-semibold'>
													{property.name}
												</p>
												<p className='text-gray-600'>
													Address:{' '}
													{property.location.street}{' '}
													{property.location.city}{' '}
													{property.location.state}
												</p>
											</div>
											<div className='mt-2'>
												<Link
													href={`/properties/${property._id}/edit`}
													className='bg-emerald-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-emerald-600'
												>
													Edit
												</Link>
												<button
													onClick={() =>
														deletePropertyFromId(
															property._id
														)
													}
													className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
													type='button'
												>
													Delete
												</button>
											</div>
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfilePage;
