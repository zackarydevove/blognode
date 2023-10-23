import React from 'react'
import UserBar from './UserBar'

const RandomAdd: React.FC = () => {
  return (
	<div className='flex flex-col justify-between bg-[#191819] w-full rounded-xl p-5'>
		<p className='text-[#cac9ca] ml-2 '>Recommendation</p>
		<div className='flex flex-col gap-4 py-2 mt-2'>
			<UserBar />
			<UserBar />
		</div>
	</div>
  )
}

export default RandomAdd
