import axios from "axios";

const API = process.env.REACT_APP_SERVER_URL + "/api/follow";

export const followUser = async (userId: number, targetId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.post(API, {
            userId,
            target: targetId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error(response.data.message || "Failed to follow user.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error following user:", errorMessage);
        throw new Error(errorMessage);
    }
}