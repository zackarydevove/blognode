import SignupPage from "../../pages/SignupPage";
import '@testing-library/jest-dom/extend-expect';
import { register } from "../../api/auth";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));
  
jest.mock('../../api/auth', () => ({
	register: jest.fn(),
}));
  
beforeEach(() => {
	(register as jest.Mock).mockClear();
	(useNavigate as jest.Mock).mockClear();
});
  
afterEach(() => {
	cleanup();
	localStorage.clear();
});

test('renders signup form correctly', () => {
	render(<SignupPage/>);

	const emailInput = screen.getByPlaceholderText('Email');
	const firstnameInput = screen.getByPlaceholderText('First name');
	const passwordInput = screen.getByPlaceholderText('Password');
	const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

	expect(emailInput).toBeInTheDocument();
	expect(firstnameInput).toBeInTheDocument();
	expect(passwordInput).toBeInTheDocument();
	expect(confirmPasswordInput).toBeInTheDocument();
})

test('update states input values correctly', () => {
	render(<SignupPage />);

	const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
	const firstnameInput = screen.getByPlaceholderText('First name') as HTMLInputElement;
	const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
	const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password') as HTMLInputElement;

	fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
	fireEvent.change(firstnameInput, { target: { value: 'test' } });
	fireEvent.change(passwordInput, { target: { value: '12345' } });
	fireEvent.change(confirmPasswordInput, { target: { value: '12345' } });

	expect(emailInput.value).toBe('test@test.com');
	expect(firstnameInput.value).toBe('test');
	expect(passwordInput.value).toBe('12345');
	expect(confirmPasswordInput.value).toBe('12345');
});

test('submit signup form correctly', async () => {
	const mockNavigate = jest.fn();
	(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	(register as jest.Mock).mockResolvedValue('mock_token');

	render(<SignupPage />)

	const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
	const firstnameInput = screen.getByPlaceholderText('First name') as HTMLInputElement;
	const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
	const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password') as HTMLInputElement;
	const button = screen.getByText("SIGN UP");

	fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
	fireEvent.change(firstnameInput, { target: { value: 'test' } });
	fireEvent.change(passwordInput, { target: { value: '12345' } });
	fireEvent.change(confirmPasswordInput, { target: { value: '12345' } });
	fireEvent.click(button);

	await waitFor(() => {
		expect(localStorage.getItem('jwtAuth')).toBe('mock_token');
		expect(mockNavigate).toHaveBeenCalledWith('/feed');
	});
})

test('does not navigate on not matching passwords', async () => {
	const mockNavigate = jest.fn();
	(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	(register as jest.Mock).mockResolvedValue("Passwords doesn't match");

	render(<SignupPage />)

	const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
	const firstnameInput = screen.getByPlaceholderText('First name') as HTMLInputElement;
	const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
	const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password') as HTMLInputElement;
	const button = screen.getByText("SIGN UP");

	fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
	fireEvent.change(firstnameInput, { target: { value: 'test' } });
	fireEvent.change(passwordInput, { target: { value: 'okay' } });
	fireEvent.change(confirmPasswordInput, { target: { value: '12345' } });
	fireEvent.click(button);

	await waitFor(() => {
		expect(localStorage.getItem('jwtAuth')).toBeNull;
		expect(mockNavigate).not.toHaveBeenCalled();
	})
})

test('does not navigate on already used email', async () => {
	const mockNavigate = jest.fn();
	(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	(register as jest.Mock).mockResolvedValue("Email already used");

	render(<SignupPage />)

	const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
	const firstnameInput = screen.getByPlaceholderText('First name') as HTMLInputElement;
	const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
	const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password') as HTMLInputElement;
	const button = screen.getByText("SIGN UP");

	fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
	fireEvent.change(firstnameInput, { target: { value: 'test' } });
	fireEvent.change(passwordInput, { target: { value: '12345' } });
	fireEvent.change(confirmPasswordInput, { target: { value: '12345' } });
	fireEvent.click(button);

	await waitFor(() => {
		expect(localStorage.getItem('jwtAuth')).toBeNull;
		expect(mockNavigate).not.toHaveBeenCalled();
	})
})