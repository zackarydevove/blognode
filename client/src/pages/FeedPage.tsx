import React from 'react'
import Navbar from '../components/General/Navbar'
import SendPost from '../components/Feed/SendPost'
import Feed from '../components/Feed/Feed'
import RandomAdd from '../components/Feed/RandomAdd'
import FeedProfileInfo from '../components/Feed/FeedProfileInfo'

const FeedPage: React.FC = () => {
	return (
		<div className='w-full min-h-screen flex flex-col bg-[#f4f3f4] dark:bg-[#0e0c0e]'>
			<Navbar />
			<div className='flex h-full pt-8 px-24 gap-12 '>
				<div className='w-[450px] max-lg:hidden'>
					<FeedProfileInfo />
				</div>
				<div className='flex flex-col gap-12 w-[700px]'>
					<SendPost />
					<Feed />
				</div>
				<div className='flex flex-col gap-12 w-[450px] max-2xl:hidden'>
					<RandomAdd />
				</div>
			</div>
		</div>
	)
}

export default FeedPage