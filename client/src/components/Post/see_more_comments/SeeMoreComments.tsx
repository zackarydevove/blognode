import React from 'react'
import { PostInterface } from '../../../interface/UserInterface'
import CommentPopUp from './CommentPopUp'

interface SeeMoreCommentsProps {
	post: PostInterface,
	setSeeMoreComments: any
}

const SeeMoreComments: React.FC<SeeMoreCommentsProps> = ({ post, setSeeMoreComments }) => {
  return (
	<div className='flex justify-center items-center w-full h-full absolute left-0 top-0'>
		<div className='w-full h-full absolute left-0 top-0 bg-white dark:bg-black opacity-60 dark:opacity-60 z-[60]'
			onClick={() => setSeeMoreComments(false)}/>
	  <div className='w-[620px] h-[90%] bg-white dark:bg-[#191819] opacity-100 dark:opacity-100 z-[70] rounded-xl border dark:border-[#2e2d2e]'>
		<div className='flex justify-center items-center p-3'>
			<h1 className='text-black dark:text-white font-bold text-lg'>Comments of {post.creator.username}</h1>
			{/* cross */}
		</div>
		<hr/>
		<div>
			<CommentPopUp post={post}/>
		</div>
	  </div>
	</div>
  )
}

export default SeeMoreComments
