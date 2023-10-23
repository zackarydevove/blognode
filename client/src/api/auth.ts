import axios from "axios";

const API = `${process.env.REACT_APP_SERVER_URL}/api/auth`;

export const login = async (email: string, password: string) => {
	try {
		const res = axios.post(`${API}/login`, {
			email,
			password
		}, {
			withCredentials: true
		});
		return res;
	} catch (err) {
		console.log(err);
	}
}

export const register = async (email: string, password: string, confirmPassword: string, firstname: string, lastname: string) => {
	try {
		const res = axios.post(`${API}/register`, {
			email,
			password,
			confirmPassword,
			firstname,
			lastname
		}, {
			withCredentials: true
		});
		return res;
	} catch (err) {
		console.log(err);
	}
}