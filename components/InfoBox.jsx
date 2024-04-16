import React from 'react';
import Link from 'next/link';

const InfoBox = ({ heading, bgColor, textColor, btnInfo, children }) => {
	return (
		<div className={`${bgColor} p-6 rounded-lg shadow-md`}>
			<h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
			<p className={`${textColor} mt-2 mb-4`}>{children}</p>
			<Link
				href={btnInfo.link}
				className={`inline-block ${btnInfo.bgColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
			>
				{btnInfo.text}
			</Link>
		</div>
	);
};

export default InfoBox;
