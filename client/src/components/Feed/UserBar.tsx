import React from 'react'
import { BsPersonFillAdd } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { UserInterface } from '../../interface/UserInterface';

interface UserBarProps {
	user: UserInterface | null,
}

const UserBar: React.FC<UserBarProps> = ({ user }) => {
    const navigate = useNavigate();

    if (!user) {
        return <p>loading...</p>
    }

	return (
        <div className='w-full flex'>
            <div className='flex items-center gap-4 flex-1'>
                <div className='h-12 w-12 bg-black rounded-full' onClick={() => navigate('/profile')}/>
                <div>
                    <p className='text-[#cac9ca]'>{user.username}</p>
                    <p className='text-xs text-[#5e5d5e]'>Software Engineer</p>
                </div>
            </div>
			<div>
				<div className='h-8 w-8 flex justify-center items-center bg-blue-300 rounded-full'>
					<BsPersonFillAdd className='text-white h-3/5 w-3/5'/>
					{/* <BsPersonFillDash /> */}
				</div>
			</div>
        </div>
    )
}

export default UserBar

