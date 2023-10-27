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
		<div className='flex flex-col flex-1 gap-2 w-full overflow-scroll hide-scrollbar'>
            {posts.map((post, key) => (

                <div className='bg-[#191819] rounded-xl' key={key}>
                    <Post post={post} />
                </div>
			))}
		</div>
	)
}

export default ProfileFeed;
