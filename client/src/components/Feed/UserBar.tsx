import React from 'react'
import { BsPersonFillDash, BsPersonFillAdd } from 'react-icons/bs'

function UserBar() {
  return (
	<div className='w-full flex'>
		<div className='flex items-center gap-4 flex-1'>
			<div className='h-12 w-12 bg-black rounded-full'/>
			<div>
				<p className='text-[#cac9ca]'>User Name</p>
				<p className='text-xs text-[#5e5d5e]'>Software Engineer</p>
			</div>
		</div>
		<div>
			<div className='h-8 w-8 flex justify-center items-center bg-blue-300 rounded-full'>
				<BsPersonFillAdd className='text-white h-3/5 w-3/5'/>
				{/* <BsPersonFillDash /> */}
			</div>
		</div>
	</div>
  )
}

export default UserBar
