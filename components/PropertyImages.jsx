import Image from 'next/image';
import React from 'react';

const PropertyImages = ({ images }) => {
	return (
		<section className='bg-emerald-50 p-4'>
			<div className='container mx-auto'>
				{images.length === 1 ? (
					<Image
						src={images[0]}
						alt=''
						className='object-cover h-[400px] mx-auto rounded-xl'
						width={0}
						height={0}
						sizes='100vw'
						priority={true}
					/>
				) : (
					<div className='grid grid-cols-2 gap-4'>
						{images.map((image, i) => {
							return (
								<div
									key={i}
									className={`${
										images.length === 3 && i == 2
											? 'col-span-2'
											: 'col-span-1'
									}`}
								>
									<Image
										key={i}
										className='object-cover h-[400px] w-full rounded-xl'
										src={image}
										alt='alt'
										width={0}
										height={0}
										sizes='100vw'
										priority={true}
									/>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};

export default PropertyImages;
