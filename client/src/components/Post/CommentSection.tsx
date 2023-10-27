import React, { useState } from 'react'
import Comment from './Comment'
import { BiSolidSend } from 'react-icons/bi';
import { useUser } from '../../context/UserContext';
import { commentPost } from '../../api/post';
import { PostInterface } from '../../interface/UserInterface';

interface CommentSectionProps {
	post: PostInterface,
}

const CommentSection: React.FC<CommentSectionProps> = ({ post }) => {
    const [content, setContent] = useState<string>('');
	const user = useUser();

    if (!user || !post) {
        return <p>loading...</p>
    }

    const handleCommentPost = async () => {
        if (content.trim() !== '' && user && post) {
            const response = await commentPost(user.id, post.id, content);
            if (response && response.message === "Comment posted successfully") {
                setContent('');
            } else {
                console.error("Failed to create post:", response);
            }
        }
    };

  return (

	<div className='flex flex-col gap-3'>
		{
			post.comments.length > 0 && post.comments[0] ?
				<div className='flex flex-col gap-2'>
					<div>
						<p className='text-black dark:text-white text-sm hover:cursor-pointer hover:underline hover:text-[#646264]'>See more comments</p>
					</div>
					<div>
						<Comment comment={post.comments[0] || null} />
					</div>
				</div>
			: null
		}
		<div className='flex w-full gap-2'>
			<div className='h-9 w-9	rounded-full bg-black'/>
			<div className='flex w-full rounded-2xl bg-[#eeedef] dark:bg-[#2e2d2e] px-6 pt-3 '>
				<textarea className='flex-1 bg-[#eeedef] dark:bg-[#2e2d2e] p-1 outline-none resize-none hide-scrollbar text-black dark:text-white'
					placeholder="What's on your mind... ?"
					value={content}
					onChange={(e) => setContent(e.target.value)}/>
				<BiSolidSend className='self-end mb-3 text-[#ece7ec]'
					onClick={handleCommentPost}/>
			</div>
			
		</div>
	</div>
  )
}

export default CommentSection
