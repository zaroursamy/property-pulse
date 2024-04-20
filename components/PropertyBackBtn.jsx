import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
const PropertyBackBtn = () => {
	return (
		<section>
			<div className='container m-auto py-6 px-6'>
				<Link
					href='/properties'
					className='text-emerald-500 hover:opacity-80 flex items-center'
				>
					<FaArrowLeft className='mr-2' />
					Back to Properties
				</Link>
			</div>
		</section>
	);
};

export default PropertyBackBtn;
