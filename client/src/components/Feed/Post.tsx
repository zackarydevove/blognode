import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { checkUserLikedPost, deletePost, likePost } from '../../api/post';
import { useUser } from '../../context/UserContext';
import CommentSection from '../Post/CommentSection';
import OptionsDropdown from '../General/OptionsDropdown';

const Post: React.FC<{ post: any }> = ({ post }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [userLikedPost, setUserLikedPost] = useState(false);
	const [likesCount, setLikesCount] = useState<number>(post.likesCount);
	const navigate = useNavigate();
	const user = useUser();

	useEffect(() => {
		const fetchUserLikedPost = async () => {
			if (!user) return ;
			try {
				const result = await checkUserLikedPost(user.id, post.id);
				setUserLikedPost(result);
			} catch (error) {
				console.error("Error checking if user already liked post:", error);
			}
		}
		fetchUserLikedPost();
	}, [user, post]);

    const handleDelete = async () => {
        try {
			if (!user || user.id !== post.creatorId) return ;
            await deletePost(post.creatorId, post.id);
			setShowDropdown(false);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
        setShowDropdown(false);
    };

	const handleLike = async () => {
        try {
			if (!user) return ;
            const result = await likePost(user.id, post.id);
			setLikesCount(prev => prev + result.likeCount);
			setUserLikedPost(result.likeCount === 1 ? true : false);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
        setShowDropdown(false);
    };

	return (
        <div className='p-4 flex flex-col gap-4'>
			<div className='w-full flex'>
				<div className='flex items-center gap-4 flex-1'>
					<div className='h-12 w-12 bg-black rounded-full hover:cursor-pointer' onClick={() => navigate(`/profile/${post.creator.username}`)}/>
					<div>
						<p className='text-black dark:text-white'>{post.creator.username}</p>
						<p className='text-xs text-[#5e5d5e]'>Software Engineer</p>
					</div>
				</div>
				<div>
					<div className='relative' onClick={() => setShowDropdown(!showDropdown)}>
						<BsThreeDots size={"1.2em"} className='text-black dark:text-white hover:cursor-pointer'/>
						{showDropdown && <OptionsDropdown onDelete={handleDelete} />}
					</div>
				</div>
			</div>
            <p className='text-black dark:text-white'>{post.content}</p>
			<hr className='border-[#e2dee3]'/>
			<div className='flex justify-evenly text-[#3f3e3f] gap-12'>
				<div className='flex items-center gap-3 hover:cursor-pointer hover:text-[#646264]'
					onClick={handleLike}>
						{
							userLikedPost ?
							<AiFillHeart size={"1.3em"}/>
							:
							<AiOutlineHeart size={"1.3em"}/> 
						}
					<p>{likesCount}</p>
				</div>
				<div className='flex items-center gap-3 hover:cursor-pointer hover:text-[#646264]'>
					<BiComment size={"1.3em"}/> 
					<p>{post.commentsCount}</p>
				</div>
				{/* <div className='flex items-center gap-3 hover:cursor-pointer hover:text-[#646264]'>
					<BiShare size={"1.3em"}/> 
					<p>12</p>
				</div> */}
			</div>
			<hr className='border-[#e2dee3]'/>
			<CommentSection post={post}/>
		
        </div>
    )
}

export default Post
