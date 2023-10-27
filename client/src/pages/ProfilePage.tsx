import React, { useEffect, useState } from 'react'
import ProfileInfo from '../components/Profile/ProfileInfo'
import SendPost from '../components/Feed/SendPost'
import ProfileFeed from '../components/Profile/ProfileFeed'
import Navbar from '../components/General/Navbar'
import { useUser } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import { getUserByUsername } from '../api/user'
import { UserInterface } from '../interface/UserInterface'

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserInterface | null>(null);
	const { username } = useParams<{ username: string }>();

	const user = useUser();

    useEffect(() => {
        if (!username) return;
        const fetchUser = async () => {
            if (username) {
                const fetchedProfile = await getUserByUsername(username);
                setProfile(fetchedProfile);
            }
        }
        fetchUser();
    }, [username]);

  return (
	<div className='h-screen w-full flex flex-col bg-[#f4f3f4] dark:bg-[#0e0c0e]'>
		<Navbar />
		<div className='flex justify-center h-full pt-8 px-24 gap-12'>
			<div className='w-[450px] max-lg:hidden'>
				<ProfileInfo profile={profile} />
			</div>
			<div className='flex flex-col gap-12 w-[700px]'>
				<SendPost />
				<ProfileFeed profile={profile} />
			</div>
		</div>
	</div>
  )
}

export default ProfilePage
