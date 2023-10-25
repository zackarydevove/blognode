import axios from "axios";

const API = process.env.REACT_APP_SERVER_URL + "/api/user";

export const getUserByEmail = async (email: string) => {
    try {
        const response = await axios.get(`${API}/email`, {
            params: {
                email
            }
        });
        
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error(response.data.message || "Failed to get user by email.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error getting user by email:", errorMessage);
        throw new Error(errorMessage);
    }
}

export const deleteUser = async (userId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.delete(`${API}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                userId
            }
        });
        
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error(response.data.message || "Failed to get user by email.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error getting user by email:", errorMessage);
        throw new Error(errorMessage);
    }
}

export const getUserById = async (targetId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.get(`${API}/${targetId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
		})
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error: any) {
        console.error("Error fetching user by ID:", error.message);
        throw error;
    }
};

export const getThreeRandomUsers = async (userId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.get(`${API}/random/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
		})
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error: any) {
        console.error("Error fetching user by ID:", error.message);
        throw error;
    }
};

export const changeFirstname = async (userId: number, firstname: string) => {
    try {
        const response = await axios.patch(`${API}/firstname`, { userId, firstname });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error: any) {
        console.error("Error updating firstname:", error.message);
        throw error;
    }
};

export const changeLastname = async (userId: number, lastname: string) => {
    try {
        const response = await axios.patch(`${API}/lastname`, { userId, lastname });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error: any) {
        console.error("Error updating lastname:", error.message);
        throw error;
    }
};

export const changePassword = async (userId: number, currentPassword: string, newPassword: string, confirmNewPassword: string) => {
    try {
        const response = await axios.patch(`${API}/password`, { userId, currentPassword, newPassword, confirmNewPassword });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error: any) {
        console.error("Error updating password:", error.message);
        throw error;
    }
};
