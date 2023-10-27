import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserInterface } from '../../interface/UserInterface';
import { useUser } from '../../context/UserContext';
import { checkFollow, followUser } from '../../api/follow';

interface UserBarProps {
	user: UserInterface | null,
}

const UserBar: React.FC<UserBarProps> = ({ user }) => {
    const [currentUserIsFollowing, setCurrentUserIsFollowing] = useState<boolean>(false);
    const navigate = useNavigate();
	const currentUser = useUser();

	useEffect(() => {
		const fetchCheckFollow = async () => {
			if (currentUser && user) {
				const isFollowing = await checkFollow(currentUser.id, user.id);
				setCurrentUserIsFollowing(isFollowing);
			}
		}
		fetchCheckFollow();
	}, [user, currentUser]);
	
	if (!user) {
		return <p>loading...</p>
	}

	const handleFollow = async () => {
		if (currentUser && user) {
			const data = await followUser(currentUser.id, user.id);
			if (data.message === "Followed successfully") {
				setCurrentUserIsFollowing(true);
			} else if (data.message === "Unfollowed successfully") {
				setCurrentUserIsFollowing(false);
			} else {
				console.log("error");
			}
		}
	}
	
	return (
        <div className='w-full flex items-center'>
            <div className='flex items-center gap-4 flex-1'>
                <div className='h-12 w-12 bg-black rounded-full hover:cursor-pointer' onClick={() => navigate(`/profile/${user.username}`)}/>
                <div>
                    <p className='text-black dark:text-white'>{user.username}</p>
                    <p className='text-xs text-[#5e5d5e]'>{user.job}</p>
                </div>
            </div>
			<div>
				<div className='flex justify-center items-center rounded-full'>
					{
						currentUserIsFollowing ? 
						<button 
							className='border border-black dark:border-white text-black dark:text-white color-black px-6 py-2 rounded-full hover:border-red-500 hover:text-red-500 dark:hover:border-red-500 dark:hover:text-red-500 transition'
							onClick={handleFollow}>
							UNFOLLOW
						</button>
						:
						<button
							className='bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full hover:bg-slate-800 dark:hover:bg-slate-300 transition'
							onClick={handleFollow}
							>
								FOLLOW
						</button>
					}
				</div>
			</div>
        </div>
    )
}

export default UserBar

