import axios from "axios";

const API = process.env.REACT_APP_SERVER_URL + "/api/post";

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
            return (response.data.message || "Failed to follow user.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error following user:", errorMessage);
        return (errorMessage);
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
            return (response.data.message || "Failed to follow user.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error following user:", errorMessage);
        return (errorMessage);
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
            return (response.data.message || "Failed to follow user.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error following user:", errorMessage);
        return (errorMessage);
    }
}

export const checkUserLikedPost = async (userId: number, postId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.get(API + "/like", {
            params: {
                userId,
				postId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (response.status === 200 && response.data) {
            return response.data.data;
        } else {
            return (response.data.message || "Failed to follow user.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error following user:", errorMessage);
        return (errorMessage);
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
            return (response.data.message || "Failed to follow user.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error following user:", errorMessage);
        return (errorMessage);
    }
}

export const deleteComment = async (userId: number, commentId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.delete(API + "/comment", {
            params: {
                userId,
				commentId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            return (response.data.message || "Failed to follow user.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error following user:", errorMessage);
        return (errorMessage);
    }
}


export const getPostComments = async (postId: number) => {
    try {
        const token = localStorage.getItem("jwtAuth");

        const response = await axios.get(API + "/commentsss", {
            params: {
				postId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (response.status === 200 && response.data) {
            return response.data.data;
        } else {
            return (response.data.message || "Failed to follow user.");
        }
    } catch (error: any) {
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        console.error("Error following user:", errorMessage);
        return (errorMessage);
    }
}