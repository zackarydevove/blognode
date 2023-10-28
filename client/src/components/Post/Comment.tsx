import React, { memo, useState } from 'react'
import { CommentInterface } from '../../interface/UserInterface'
import { BsThreeDots } from 'react-icons/bs'
import { deleteComment } from '../../api/post'
import { useUser } from '../../context/UserContext'
import OptionsDropdown from '../General/OptionsDropdown'
import { getTimePassed } from '../../utils/convertTime'

interface CommentProps {
	comment: CommentInterface | null
}

const Comment: React.FC<CommentProps> = ({ comment = null}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const user = useUser();

	if (!comment) return <div></div>;

	const handleDelete = async () => {
        try {
			if (!user || user.id !== comment.userId) return ;
            const res = await deleteComment(comment.userId, comment.id);
			setShowDropdown(false);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
        setShowDropdown(false);
    };

  return (
	<div className='flex gap-2'>
		<div>
			<div className='h-9 w-9	rounded-full bg-black'/>
		</div>
		<div className='flex flex-col flex-1'>
			<div className='flex w-full rounded-2xl bg-[#eeedef] dark:bg-[#2e2d2e] p-3 text-black dark:text-white'>
				<div className='flex flex-col flex-1 gap-2'>
					<p className='text-sm'>{comment.user.username}</p>
					<div className='text-xs'>
						<p >{comment.content}</p>
					</div>
				</div>
				<div className='relative text-black' onClick={() => setShowDropdown(!showDropdown)}>
					<BsThreeDots size={"1.2em"} className='text-black dark:text-white hover:cursor-pointer'/>
					{showDropdown && <OptionsDropdown onDelete={handleDelete} />}
				</div>
			</div>
			<div className='flex gap-5 text-sm text-[#3f3f3f]'>
				<p className='hover:cursor-pointer hover:underline'>Like</p>
				<p className='hover:cursor-pointer hover:underline'>Comment</p>
				{/* <p className='hover:cursor-pointer hover:underline'>Share</p> */}
				<p>{getTimePassed(new Date(comment.createdAt))}</p>
			</div>

		</div>
	</div>
  )
}

export default memo(Comment);
