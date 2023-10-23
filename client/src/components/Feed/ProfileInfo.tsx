import React from 'react'
import { BsPersonFillGear, BsBriefcase } from 'react-icons/bs'
import { MdOutlineLocationOn } from 'react-icons/md'

const ProfileInfo: React.FC = () => {
  return (
	<div className='bg-[#191819] w-full rounded-xl p-5 text-[#cac9ca]'>
		<div className='flex items-center '>
			<div className='flex items-center gap-4 flex-1'>
				<div className='h-14 w-14 bg-black rounded-full hover:cursor-pointer'/>
				<div className='flex flex-col'>
					<p className='text-lg font-bold'>My Name</p>
					<p className='text-sm text-[#5e5d5e]'>5 friends</p>
				</div>
			</div>
			<BsPersonFillGear size={'1.4em'} className='hover:cursor-pointer' />
		</div>
		<hr className='border-[#2e2d2e] my-6'/>
		<div className='flex flex-col gap-4 ml-2'>
			<div className='flex gap-2 items-center'>
				<MdOutlineLocationOn size={'1.3em'}/>
				<p className='text-sm text-[#5e5d5e]'>Paris, France</p>
			</div>
			<div className='flex gap-2 items-center'>
				<BsBriefcase size={'1.2em'}/>
				<p className='text-sm text-[#5e5d5e]'>Software Engineer</p>
			</div>
		</div>
	</div>
  )
}

export default ProfileInfo
