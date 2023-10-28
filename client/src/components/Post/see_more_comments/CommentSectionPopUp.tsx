import React, { useEffect, useState } from 'react'
import Comment from './../Comment'
import { BiSolidSend } from 'react-icons/bi';
import { useUser } from '../../../context/UserContext';
import { commentPost, getPostComments } from '../../../api/post';
import { CommentInterface, PostInterface } from '../../../interface/UserInterface';

interface CommentSectionProps {
	post: PostInterface,
}

const CommentSectionPopUp: React.FC<CommentSectionProps> = ({ post }) => {
    const [content, setContent] = useState<string>('');
    const [comments, setComments] = useState<CommentInterface[] | []>([]);
	const user = useUser();

	useEffect(() => {
		const fetchComments = async () => {
			if (!post) return ;
			const comments = await getPostComments(post.id);
			console.log(comments);
			setComments(comments);
		}
		fetchComments();
	}, [post])

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

	<div className='flex-1 flex flex-col gap-3'>
		<div className='flex-1 overflow-y-auto max-h-[399px]'>
			{
				comments.length > 0 ?
					comments.map((comment, key) => (
							<div key={key}>
								<Comment comment={comment || null} />
							</div>
					))
				: null
			}
		</div>
		<div className='flex w-full gap-2'>
			<div className='h-9 w-9	rounded-full bg-black'/>
			<div className='flex w-full rounded-2xl bg-[#eeedef] dark:bg-[#2e2d2e] px-6 pt-3 '>
				<textarea className='flex-1 bg-[#eeedef] dark:bg-[#2e2d2e] p-1 outline-none resize-none hide-scrollbar text-black dark:text-white'
					placeholder="What's on your mind... ?"
					value={content}
					onChange={(e) => setContent(e.target.value)}/>
				<BiSolidSend className='self-end mb-3 text-black dark:text-white'
					onClick={handleCommentPost}/>
			</div>
			
		</div>
	</div>
  )
}

export default CommentSectionPopUp
