import React from 'react'
import { UserInterface } from '../../interface/UserInterface'
import { useNavigate } from 'react-router-dom'
interface UserSearchComponentProps {
	user: UserInterface
}

const UserSearchComponent: React.FC<UserSearchComponentProps> = ({ user }) =>  {
	const navigate = useNavigate();
	
  return (
	<div className='flex items-center gap-3 w-full hover:cursor-pointer hover:bg-gray-500 p-4'
		onClick={() => navigate(`/profile/${user.username}`)}>
		<div>
			<div className='h-12 w-12 bg-black rounded-full'/>
		</div>
		<div className='flex-1 flex flex-col gap-1 text-white'>
			<p className=''>{user.username}</p>
			<p className='text-sm text-[#525353]'>{user.job}</p>
		</div>
	</div>
  )
}

export default UserSearchComponent
