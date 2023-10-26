import React, { useEffect, useState } from 'react'
import Post from '../Feed/Post';
import { getUserPosts } from '../../api/feed';
import { useUser } from '../../context/UserContext';
import { UserInterface } from '../../interface/UserInterface';

interface ProfileFeedProps {
	profile: UserInterface | null,
}

const ProfileFeed: React.FC<ProfileFeedProps> = ({ profile }) => {
	const [posts, setPosts] = useState([]);
    const user = useUser();

    useEffect(() => {
        const fetchPosts = async () => {
			if (!profile) return;
            const data = await getUserPosts(profile.id);
            setPosts(data);
        };
        fetchPosts();
    }, [profile]);

    if (!user) {
        return <p>loading...</p>
    }

	return (

		<div className='flex flex-col flex-1 gap-2 bg-[#191819] w-full rounded-b-none rounded-xl overflow-scroll hide-scrollbar'>
            {posts.map((post, key) => (

                <div key={key}>
                    <Post post={post} />
                    <hr className='border-[#2e2d2e] mx-4' />
                </div>
			))}
		</div>
	)
}

export default ProfileFeed;
