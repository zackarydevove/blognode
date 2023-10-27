import React, { memo } from 'react'
import { CommentInterface } from '../../interface/UserInterface'

interface CommentProps {
	comment: CommentInterface | null
}

const Comment: React.FC<CommentProps> = ({ comment = null}) => {
	if (!comment) return <div></div>;
	console.log("comment receive in comment: ", comment);
  return (
	<div className='flex gap-2'>
		<div>
			<div className='h-9 w-9	rounded-full bg-black'/>
		</div>
		<div className='flex flex-col flex-1'>
			<div className='flex flex-col w-full rounded-2xl bg-[#2e2d2e] p-3 text-[#c4c4c4]'>
				<p className='text-xs'>{comment.user.username}</p>
				<div className='text-sm'>
					<p >{comment.content}</p>
				</div>
			</div>
			<div className='flex gap-5 text-sm text-[#3f3f3f]'>
				<p className='hover:cursor-pointer hover:underline'>Like</p>
				<p className='hover:cursor-pointer hover:underline'>Comment</p>
				{/* <p className='hover:cursor-pointer hover:underline'>Share</p> */}
				<p>1h</p>
			</div>

		</div>
	</div>
  )
}

export default memo(Comment);
