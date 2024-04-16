import React from 'react';
import InfoBox from './InfoBox';

const InfoBoxes = () => {
	const rentersBtnInfo = {
		link: '/properties',
		text: 'Browse Properties',
		bgColor: 'bg-black'
	};

	const ownersBtnInfo = {
		link: '/properties/add',
		text: 'Add Property',
		bgColor: 'bg-emerald-500'
	};

	return (
		<section>
			<div className='container-xl lg:container m-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
					<InfoBox
						hrefLink='/properties'
						heading='For Renters'
						bgColor='bg-gray-100'
						btnInfo={rentersBtnInfo}
						btnHoverColor='gray-100'
						btnColor='black'
						textColor='text-black'
					>
						Find your dream rental property. Bookmark properties and
						contact owners.
					</InfoBox>

					<InfoBox
						hrefLink='/properties/add'
						heading='For Property Owners'
						bgColor='bg-emerald-100'
						btnInfo={ownersBtnInfo}
						btnColor='emerald-500'
						btnHoverColor='emerald-600'
						textColor='text-black'
					>
						List your properties and reach potential tenants. Rent
						as an airbnb or long term.
					</InfoBox>
				</div>
			</div>
		</section>
	);
};

export default InfoBoxes;
