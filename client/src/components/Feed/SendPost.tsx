import React from 'react'
import { BsCardImage } from 'react-icons/bs'
import { AiOutlineFileGif } from 'react-icons/ai'
import { IoIosAttach } from 'react-icons/io'

const SendPost: React.FC = () => {
  return (

	<div className='flex flex-col bg-[#191819] w-full min-h-[200px] rounded-xl p-4'>
		<div className='flex gap-6 items-center flex-1'>
			<div className='h-16 w-16 bg-black rounded-full'/>
			<div className='flex items-center flex-1 h-full bg-[#2e2d2e] rounded-full'>
				<textarea className='w-full rounded-full bg-[#2e2d2e] px-6 outline-none' placeholder="What's on your mind... ?"/>
			</div>
		</div>
		<hr className='border-[#2e2d2e] my-4'/>
		<div className='flex gap-12 justify-center items-center text-[#2e2d2e]'>
			<div className='flex gap-3'>
				<BsCardImage size={'1.5em'}/>
				<p>Image</p>
			</div>
			<div className='flex gap-3'>
			<AiOutlineFileGif size={'1.7em'}/>
				<p>GIF</p>
			</div>
			<div className='flex gap-3'>
			<IoIosAttach size={'1.7em'}/>
				<p>File</p>
			</div>
			<button className='bg-white rounded-full px-6 py-2'>POST</button>
		</div>
	</div>
  )
}

export default SendPost
