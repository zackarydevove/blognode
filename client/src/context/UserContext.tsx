import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserByToken } from '../api/user';
import { UserInterface } from '../interface/UserInterface';

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserInterface | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserInterface | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserByToken();
            setUser(user);
        };
        fetchUser();
    }, []);

    return  (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
    return useContext(UserContext);
};
