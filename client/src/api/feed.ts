import axios from "axios";

const API = process.env.REACT_APP_SERVER_URL + "/api/feed";

export const getFeed = async (userId: number, page: number = 1) => {
	try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.get(API + `/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page
            }
        });
		if (response.status === 200 && response.data) {
			return response.data;
		} else {
			return (response.data.message || "Failed to fetch feed.");
		}
	} catch (error: any) {
		const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
		console.error("Error fetching feed:", errorMessage);
		return (errorMessage);
	}
}


export const getUserPosts = async (userId: number, page: number = 1) => {
	try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.get(API + `/posts/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page
            }
        });
		if (response.status === 200 && response.data) {
			return response.data;
		} else {
			return (response.data.message || "Failed to fetch feed.");
		}
	} catch (error: any) {
		const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
		console.error("Error fetching feed:", errorMessage);
		return (errorMessage);
	}
}