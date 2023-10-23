import React from 'react'
import Navbar from '../components/Feed/Navbar'
import SendPost from '../components/Feed/SendPost'
import ActualFeed from '../components/Feed/ActualFeed'
import RandomAdd from '../components/Feed/RandomAdd'
import ProfileInfo from '../components/Feed/ProfileInfo'

const FeedPage: React.FC = () => {
	return (
		<div className='h-screen w-full flex flex-col bg-[#0d0b0d]'>
			<Navbar />
			<div className='flex justify-between h-full pt-8 px-24 gap-12'>
				<div className='w-[450px] max-lg:hidden'>
					<ProfileInfo />
				</div>
				<div className='flex flex-col gap-12 w-[700px]'>
					<SendPost />
					<ActualFeed />
				</div>
				<div className='flex flex-col gap-12 w-[450px] max-2xl:hidden'>
					<RandomAdd />
				</div>
			</div>
		</div>
	)
}

export default FeedPage