import axios from "axios";

const API = process.env.REACT_APP_SERVER_URL + "/api/auth";

export const login = async (email: string, password: string) => {
	try {
		const response = await axios.post(API + "/login", {
			email,
			password
		});
	
		if (response.status === 200 && response.data.token) {
			return response.data.token;
		} else {
			return (response.data.message || "Failed to login.");
		}
	} catch (error: any) {
		const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
		console.error("Error logging in:", errorMessage);
		return (errorMessage);
	}
}

export const register = async (	
		email: string,
		password: string,
		confirmPassword: string,
		username: string,
	) => {
	try {
		const response = await axios.post(API + "/register", {
			email,
			password,
			confirmPassword,
			username,
		});
	
		if (response.status === 200 && response.data.token) {
			return response.data.token;
		} else {
			return (response.data.message || "Failed to login.");
		}
	} catch (error: any) {
		const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
		console.error("Error logging in:", errorMessage);
		return (errorMessage);
	}
}