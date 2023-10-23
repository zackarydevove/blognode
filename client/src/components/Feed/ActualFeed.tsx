import React from 'react'
import Post from './Post'

const ActualFeed: React.FC = () => {
  
	return (

		<div className='flex flex-col flex-1 gap-2 bg-[#191819] w-full rounded-b-none rounded-xl overflow-scroll hide-scrollbar'>
			<Post />
			<hr className='border-[#2e2d2e] mx-4'/>
			<Post />
			<hr className='border-[#2e2d2e] mx-4'/>
			<Post />
			<hr className='border-[#2e2d2e] mx-4'/>
			<Post />
			<hr className='border-[#2e2d2e] mx-4'/>
			<Post />
			<hr className='border-[#2e2d2e] mx-4'/>
		</div>
	)
}

export default ActualFeed
