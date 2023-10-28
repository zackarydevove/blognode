import React from 'react'
import UserSearchComponent from './UserSearchComponent'
import { UserInterface } from '../../interface/UserInterface'

interface SearchDropdownProps {
	users: UserInterface[]
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ users }) => {
	if (!Array.isArray(users) || users.length === 0) return <div/>;
	console.log("users: ", users);
  return (
	<div className='flex flex-col min-h-[200px] w-full absolute translate-y-[65%] z-30 bg-white dark:bg-[#191819] rounded-xl border dark:border-[#2e2d2e] border-opacity-30 overflow-x-hidden'>
		{
			users.map((user) => (
				<UserSearchComponent key={user.id} user={user}/>
			))
		}
	</div>
  )
}

export default SearchDropdown
