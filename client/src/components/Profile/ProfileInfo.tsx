import React, { useEffect, useState } from 'react'
import { BsPersonFillGear, BsBriefcase, BsPersonFillAdd, BsPersonFillDash } from 'react-icons/bs'
import { MdOutlineLocationOn } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { UserInterface } from '../../interface/UserInterface'
import { checkFollow, followUser } from '../../api/follow'
import { useUser } from '../../context/UserContext'

interface ProfileInfoProps {
	profile: UserInterface | null,
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
    const [userFollowProfile, setUserFollowProfile] = useState<boolean>(false);
	const navigate = useNavigate();
	const user = useUser();

	useEffect(() => {
		const fetchCheckFollow = async () => {
			if (user && profile) {
				const isFollowing = await checkFollow(user.id, profile.id);
				setUserFollowProfile(isFollowing);
			}
		}
		fetchCheckFollow();
	}, [user, profile]);

    if (!profile || !user) {
        return <p className='text-white'>loading...</p>
    }

	const handleFollow = async () => {
		if (user && profile) {
			const data = await followUser(user.id, profile.id);
			if (data.message === "Followed successfully") {
				setUserFollowProfile(true);
			} else if (data.message === "Unfollowed successfully") {
				setUserFollowProfile(false);
			} else {
				console.log("error");
			}
		}
	}

  return (
	<div className='bg-white dark:bg-[#191819] w-full rounded-xl p-5 text-[#cac9ca]'>
		<div className='flex items-center '>
			<div className='flex items-center gap-4 flex-1'>
				<div className='h-14 w-14 bg-black rounded-full hover:cursor-pointer'
				onClick={() => navigate(`/profile/${profile.username}`)}/>
				<div className='flex flex-col'>
					<p className='text-lg font-bold'>{profile.username}</p>
					<p className='text-sm text-[#5e5d5e]'>{profile.followersCount} friends</p>
				</div>
			</div>
			<div>
				{
					user.username === profile.username 
					? <BsPersonFillGear size={"1.4em"} className='text-black dark:text-white hover:cursor-pointer' />
					: ( userFollowProfile 
						? <BsPersonFillDash size={"1.4em"} className='text-black dark:text-white hover:cursor-pointer' onClick={handleFollow}/>
						: <BsPersonFillAdd size={"1.4em"} className='text-black dark:text-white hover:cursor-pointer' onClick={handleFollow}/>
					  )
				}
			</div>
		</div>
		<hr className='border-[#e2dee3] my-6'/>
		<div className='flex flex-col gap-4 ml-2'>
			<div className='flex gap-2 items-center'>
				<MdOutlineLocationOn size={'1.3em'}/>
				<p className='text-sm text-[#5e5d5e]'>{profile.location}</p>
			</div>
			<div className='flex gap-2 items-center'>
				<BsBriefcase size={'1.2em'}/>
				<p className='text-sm text-[#5e5d5e]'>{profile.job}</p>
			</div>
		</div>
	</div>
  )
}

export default ProfileInfo
