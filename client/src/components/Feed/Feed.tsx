import React, { useEffect, useState } from 'react'
import Post from './Post'
import { getFeed } from '../../api/feed';
import { useUser } from '../../context/UserContext';

const Feed: React.FC = () => {
	const [posts, setPosts] = useState([]);
    const user = useUser();

    useEffect(() => {
        const fetchPosts = async () => {
			if (!user) return;
            const data = await getFeed(user.id);
            setPosts(data);
        };
        fetchPosts();
    }, [user]);

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

export default Feed;
