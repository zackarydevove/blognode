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

		<div className='flex flex-col flex-1 gap-2 w-full pb-16'>
            {posts.map((post, key) => (

                <div className='bg-white dark:bg-[#191819] rounded-xl' key={key}>
                    <Post post={post} />
                </div>
			))}
		</div>
	)
}

export default Feed;
