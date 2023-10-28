import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from '../../pages/LoginPage';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));
  
  jest.mock('../../api/auth', () => ({
	login: jest.fn(),
}));

beforeEach(() => {
    localStorage.clear();
});

beforeEach(() => {
    jest.resetAllMocks();
});


test('renders login form', () => {
	render(<LoginPage />);
  
	const emailInput = screen.getByPlaceholderText('Email');
	const passwordInput = screen.getByPlaceholderText('Password');
	const signInButton = screen.getByText('SIGN IN');
  
	expect(emailInput).toBeInTheDocument();
	expect(passwordInput).toBeInTheDocument();
	expect(signInButton).toBeInTheDocument();
});

test('updates email and password input values correctly', () => {
	render(<LoginPage />);
  
	const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
	const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
  
	fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
	fireEvent.change(passwordInput, { target: { value: '123456' } });
  
	expect(emailInput.value).toBe('test@test.com');
	expect(passwordInput.value).toBe('123456');
});

test('handles successful login', async () => {
	const mockNavigate = jest.fn();
	(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	(login as jest.Mock).mockResolvedValue('mock_token');
  
	render(<LoginPage />);
  
	const emailInput = screen.getByPlaceholderText('Email');
	const passwordInput = screen.getByPlaceholderText('Password');
	const signInButton = screen.getByText('SIGN IN');
  
	fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
	fireEvent.change(passwordInput, { target: { value: '123456' } });
	fireEvent.click(signInButton);
  
	// Await any async operations (like the login call)
	await waitFor(() => {
	  expect(localStorage.getItem('jwtAuth')).toBe('mock_token');
	  expect(mockNavigate).toHaveBeenCalledWith('/feed');
	});
});

test('does not navigate on failed login', async () => {
	const mockNavigate = jest.fn();
	(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	(login as jest.Mock).mockResolvedValue('Incorrect email or password');
  
	render(<LoginPage />);
  
	const signInButton = screen.getByText('SIGN IN');
	fireEvent.click(signInButton);
  
	await waitFor(() => {
	  expect(localStorage.getItem('jwtAuth')).toBeNull();
	  expect(mockNavigate).not.toHaveBeenCalled();
	});
});