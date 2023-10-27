import React, { useEffect, useState } from 'react'
import { BiSolidMoon } from 'react-icons/bi'
import { BsFillChatLeftTextFill, BsFillBellFill, BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import SearchDropdown from '../Search/SearchDropdown'
import { UserInterface } from '../../interface/UserInterface'
import { searchUsers } from '../../api/user'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../../redux/slice/themeSlice'

const Navbar: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [users, setUsers] = useState<UserInterface[]>([]);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  
	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	}, [isDarkMode]);

	console.log("Navbar rendered with isDarkMode: ", isDarkMode);


	useEffect(() => {
		const fetchSearch = async () => {
			if (searchTerm.trim() === '') return ;
			console.log("searchTerm: ", searchTerm);
			const res = await searchUsers(searchTerm);
			console.log("res in navbar: ", res);
			setUsers(res);
		}
		fetchSearch();
	}, [searchTerm])

	const handleLogout = () => {
		localStorage.removeItem("jwtAuth");
		navigate("/login");
	}

  return (
		<div className='sticky top-0 z-50 bg-white dark:bg-[#191819] flex justify-between px-24 py-2'>
			<div className='flex items-center'>
				<div className='h-3/4 w-[200px] bg-brand_name bg-no-repeat bg-contain'
					onClick={() => navigate('/feed')}/>
				<div className='relative flex justify-center items-center bg-[#eeedef] dark:bg-[#2e2d2e] h-10 rounded-2xl px-4'>
					<input 
						className='bg-[#eeedef] dark:bg-[#2e2d2e] outline-none text-black dark:text-white' 
						placeholder='Search...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onFocus={() => setShowDropdown(true)}
						onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
					  />
					<AiOutlineSearch className='text-black dark:text-white' size={'1.5em'}/>
      				{showDropdown && <SearchDropdown users={users} />}
				</div>
			</div>
			<div className='text-black dark:text-white flex gap-10 items-center'>
				<BiSolidMoon size={'1.2em'} onClick={() => dispatch(toggleDarkMode())} />
				<BsFillChatLeftTextFill size={'1.2em'} />
				<BsFillBellFill size={'1.2em'} />
				<BsFillArrowUpRightCircleFill className="hover:cursor-pointer" onClick={handleLogout} size={'1.2em'}/>
			</div>
		</div>
  )
}

export default Navbar
