import React from 'react';
import { FaBookmark, FaPaperPlane, FaShare } from 'react-icons/fa6';
import PropertyDetails from './PropertyDetails';

const PropertyInfo = ({ property, loading }) => {
	return (
		<section className='bg-emerald-50'>
			<div className='container m-auto py-10 px-6'>
				<div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
					<PropertyDetails property={property} loading={loading} />

					<aside className='space-y-4'>
						<button className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
							<FaBookmark className='mr-2' /> Bookmark Property
						</button>
						<button className='bg-gray-800 hover:opacity-80 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
							<FaShare className='mr-2' /> Share Property
						</button>

						<div className='bg-white p-6 rounded-lg shadow-md'>
							<h3 className='text-xl font-bold mb-6'>
								Contact Property Manager
							</h3>
							<form>
								<div classNameName='mb-4'>
									<label
										classNameName='block text-gray-700 text-sm font-bold mb-2'
										htmlFor='name'
									>
										Name:
									</label>
									<input
										classNameName='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										id='name'
										type='text'
										placeholder='Enter your name'
										required
									/>
								</div>
								<div className='mb-4'>
									<label
										className='block text-gray-700 text-sm font-bold mb-2'
										htmlFor='email'
									>
										Email:
									</label>
									<input
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										id='email'
										type='email'
										placeholder='Enter your email'
										required
									/>
								</div>
								<div classNameName='mb-4'>
									<label
										classNameName='block text-gray-700 text-sm font-bold mb-2'
										htmlFor='phone'
									>
										Phone:
									</label>
									<input
										classNameName='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										id='phone'
										type='text'
										placeholder='Enter your phone number'
									/>
								</div>
								<div className='mb-4'>
									<label
										className='block text-gray-700 text-sm font-bold mb-2'
										htmlFor='message'
									>
										Message:
									</label>
									<textarea
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
										id='message'
										placeholder='Enter your message'
									></textarea>
								</div>
								<div>
									<button
										className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
										type='submit'
									>
										<FaPaperPlane className='mr-2' />
										Send Message
									</button>
								</div>
							</form>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
};

export default PropertyInfo;
