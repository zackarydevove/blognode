import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../api/post';

const Post: React.FC<{ post: any }> = ({ post }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const result = await deletePost(post.creatorId, post.id);
            console.log(result);
			setShowDropdown(false);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
        setShowDropdown(false);
    };

	return (
        <div className='p-4 flex flex-col gap-4'>
			<div className='w-full flex'>
            <div className='flex items-center gap-4 flex-1'>
                <div className='h-12 w-12 bg-black rounded-full' onClick={() => navigate('/profile')}/>
                <div>
                    <p className='text-[#cac9ca]'>{post.creator.username}</p>
                    <p className='text-xs text-[#5e5d5e]'>Software Engineer</p>
                </div>
            </div>
			<div>
                <div className='relative' onClick={() => setShowDropdown(!showDropdown)}>
                    <BsThreeDots size={"1.2em"} className='text-white'/>
                    {showDropdown && <OptionsDropdown onDelete={handleDelete} />}
                </div>
			</div>
        </div>
            <p className='text-[#cac9ca]'>{post.content}</p>
        </div>
    )
}

const OptionsDropdown: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
    return (
        <div className="absolute bg-white rounded mt-2 w-40 right-0 z-10 shadow">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={onDelete}>
                Delete Post
            </button>
        </div>
    );
};

export default Post
