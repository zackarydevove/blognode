import axios from "axios";

const API = process.env.REACT_APP_SERVER_URL + "/api/follow";

export const createPost = async (userId: number, content: string) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.post(API, {
            userId,
            content
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

export const deletePost = async (userId: number, postId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.delete(API, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                userId,
                postId
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

export const likePost = async (userId: number, postId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.post(API + "/like", {
            userId,
            postId
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

export const commentPost = async (userId: number, postId: number, content: string) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.post(API + "/comment", {
            userId,
            postId,
			content
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

export const deleteComment = async (userId: number, commentId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.post(API + "/comment", {
            userId,
			commentId
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