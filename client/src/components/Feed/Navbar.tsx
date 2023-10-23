import React from 'react'
import { BiSolidMoon } from 'react-icons/bi'
import { BsFillChatLeftTextFill, BsFillBellFill, BsFillQuestionCircleFill, BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("jwtAuth");
		navigate("/login");
	}
  return (
		<div className='bg-[#191819] flex justify-between px-24 py-2'>
			<div className='flex items-center'>
				<div className='h-3/4 w-[200px] bg-brand_name bg-no-repeat bg-contain'/>
				<div className='flex justify-center items-center bg-[#2e2d2e] h-10 rounded-2xl px-4'>
					<input className='bg-[#2e2d2e] outline-none text-white' placeholder='Search...'/>
					<AiOutlineSearch className='text-white' size={'1.5em'}/>
				</div>
			</div>
			<div className='text-white flex gap-10 items-center'>
				<BiSolidMoon size={'1.2em'} />
				<BsFillChatLeftTextFill size={'1.2em'} />
				<BsFillBellFill size={'1.2em'} />
				<BsFillQuestionCircleFill size={'1.2em'} />
				<BsFillArrowUpRightCircleFill className="hover:cursor-pointer" onClick={handleLogout} size={'1.2em'}/>
			</div>
		</div>
  )
}

export default Navbar
