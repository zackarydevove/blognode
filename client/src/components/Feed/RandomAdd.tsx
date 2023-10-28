import React, { useEffect, useState } from 'react';
import UserBar from './UserBar';
import { getThreeRandomUsers } from '../../api/user';
import { useUser } from '../../context/UserContext';

const RandomAdd: React.FC = () => {
    const [randomUsers, setRandomUsers] = useState([]);
    const user = useUser();

    useEffect(() => {
        const fetchThreeRandomUsers = async () => {
            if (!user) return;
            const res = await getThreeRandomUsers(user.id);
            setRandomUsers(res);
        }

        fetchThreeRandomUsers();
    }, [user]);

    return (
        <div className='sticky top-[87px] z-20 flex flex-col justify-between bg-white dark:bg-[#191819] w-full rounded-xl p-5'>
            <p className='text-black dark:text-white ml-2 '>Recommendation</p>
            <div className='flex flex-col gap-4 py-2 mt-2'>
                {
                    randomUsers.length > 0 ? (
                        randomUsers.map((randomUser, key) => (
                            <UserBar key={key} user={randomUser} />
                        ))
                    ) : null
                }
            </div>
        </div>
    )
}

export default RandomAdd;