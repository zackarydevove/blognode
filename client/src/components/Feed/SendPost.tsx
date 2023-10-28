import React, { useState } from 'react'
import { BsCardImage } from 'react-icons/bs'
import { AiOutlineFileGif } from 'react-icons/ai'
import { IoIosAttach } from 'react-icons/io'
import { useUser } from '../../context/UserContext'
import { createPost } from '../../api/post'

const SendPost: React.FC = () => {
    const [content, setContent] = useState<string>('');
	const user = useUser();

    if (!user) {
        return <p>loading...</p>
    }

    const handleCreatePost = async () => {
        if (content.trim() !== '' && user) {
            const response = await createPost(user.id, content);
            if (response && response.message === "New post created successfully") {
                setContent('');
            } else {
                console.error("Failed to create post:", response);
            }
        }
    };

  return (

	<div className='flex flex-col bg-white dark:bg-[#191819] w-full min-h-[200px] rounded-xl p-4'>
		<div className='flex gap-6 items-center flex-1'>
			<div className='flex items-center flex-1 h-full bg-[#eeedef] dark:bg-[#2e2d2e] rounded-2xl px-6'>
				<textarea className='w-full bg-[#eeedef] dark:bg-[#2e2d2e] outline-none resize-none hide-scrollbar text-black dark:text-white'
					placeholder="What's on your mind... ?"
					value={content}
					onChange={(e) => setContent(e.target.value)}/>
			</div>
		</div>
		<hr className='border-[#e2dee3] my-4'/>
		<div className='flex max-[380px]:gap-4 gap-12 justify-center items-center text-[#eeedef] dark:text-[#2e2d2e]'>
			<div className='flex gap-3'>
				<BsCardImage size={'1.5em'}/>
				<p className='max-sm:hidden'>Image</p>
			</div>
			<div className='flex gap-3'>
			<AiOutlineFileGif size={'1.7em'}/>
				<p className='max-sm:hidden'>GIF</p>
			</div>
			<div className='flex gap-3'>
			<IoIosAttach size={'1.7em'}/>
				<p className='max-sm:hidden'>File</p>
			</div>
			<button className='bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black hover:border-black dark:hover:bg-[#191819] dark:hover:text-white dark:hover:border-white rounded-full px-6 py-2' onClick={handleCreatePost}>POST</button>
		</div>
	</div>
  )
}

export default SendPost
