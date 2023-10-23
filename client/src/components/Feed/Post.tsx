import React from 'react'
import UserBar from './UserBar'

const Post: React.FC = () => {
  return (
	<div className='p-4 flex flex-col gap-4'>
		<UserBar />
		<p className='text-[#cac9ca]'>Some really long random description</p>
	</div>
  )
}

export default Post
