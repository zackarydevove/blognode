export function validateEmail(email: string): boolean {
	const regex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
	return regex.test(email);
}