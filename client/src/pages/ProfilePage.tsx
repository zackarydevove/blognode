import React from 'react'
import ProfileInfo from '../components/Feed/ProfileInfo'
import SendPost from '../components/Feed/SendPost'
import Feed from '../components/Feed/Feed'
import Navbar from '../components/Feed/Navbar'

const ProfilePage: React.FC = () => {
  return (
	<div className='h-screen w-full flex flex-col bg-[#0d0b0d]'>
		<Navbar />
		<div className='flex justify-center h-full pt-8 px-24 gap-12'>
			<div className='w-[450px] max-lg:hidden'>
				<ProfileInfo />
			</div>
			<div className='flex flex-col gap-12 w-[700px]'>
				<SendPost />
				<Feed />
			</div>
		</div>
	</div>
  )
}

export default ProfilePage
