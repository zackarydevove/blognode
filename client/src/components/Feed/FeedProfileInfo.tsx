import React, { useEffect, useState } from 'react'
import { BsPersonFillGear, BsBriefcase } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'
import { MdOutlineLocationOn } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { updateUserDetails } from '../../api/user'

const FeedProfileInfo: React.FC = () => {
	const navigate = useNavigate();
	const user = useUser();

	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [localUsername, setLocalUsername] = useState("");
	const [localLocation, setLocalLocation] = useState("");
	const [localJob, setLocalJob] = useState("");
	
	useEffect(() => {
		if (user) {
			setLocalUsername(user.username);
			setLocalLocation(user.location);
			setLocalJob(user.job);
		}
	}, [user])

	if (!user) {
		return <p>loading...</p>
	}
	
    const handleSaveChanges = async () => {
        try {
			const res = await updateUserDetails(user.id, localUsername, localLocation, localJob);
			console.log("res in feedporfileinfo: ", res);
		} catch (err) {
			console.log(err);
		}
        setIsEditMode(false);
    };

	const Icon = isEditMode ? AiOutlineCheck : BsPersonFillGear;
    const handleClick = isEditMode ? handleSaveChanges : () => setIsEditMode(true);

	return (
		<div className='sticky top-[87px] z-50 bg-white dark:bg-[#191819] w-full rounded-xl p-5 text-black dark:text-white'>
			<div className='flex items-center '>
				<div className='flex items-center gap-4 flex-1'>
					<div className='h-14 w-14 bg-black rounded-full hover:cursor-pointer'
					onClick={() => navigate(`/profile/${localUsername}`)}/>
					<div className='flex flex-col'>
                        {isEditMode 
                            ? <input className='bg-white dark:bg-[#191819] text-lg font-bold' value={localUsername} onChange={(e) => setLocalUsername(e.target.value)} />
                            : <p className='text-lg font-bold'>{localUsername}</p>}
						<p className='text-sm text-[#5e5d5e]'>{user.followersCount} friends</p>
					</div>
				</div>
				<Icon size={'1.4em'} className='hover:cursor-pointer' onClick={handleClick} />
			</div>
			<hr className='border-[#e2dee3] my-6'/>
			<div className='flex flex-col gap-4 ml-2'>
				<div className='flex gap-2 items-center'>
					<MdOutlineLocationOn size={'1.3em'}/>
						{isEditMode ? (<input className='bg-white dark:bg-[#191819] text-sm text-[#5e5d5e]' placeholder="Location" value={localLocation} onChange={(e) => setLocalLocation(e.target.value)}/>)
					: <p className='text-sm text-[#5e5d5e]'>{localLocation}</p>}
				</div>
				<div className='flex gap-2 items-center'>
					<BsBriefcase size={'1.2em'}/>
					{isEditMode ? (<input className='bg-white dark:bg-[#191819] text-sm text-[#5e5d5e]' placeholder="Location" value={localJob} onChange={(e) => setLocalJob(e.target.value)}/>)
					 : <p className='text-sm text-[#5e5d5e]'>{localJob}</p> }
				</div>
			</div>
		</div>
	)
}

export default FeedProfileInfo
