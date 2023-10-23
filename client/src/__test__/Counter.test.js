import React from "react";
import Counter from "../components/Counter";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

describe('Counter Component', () => {
	test('renders correctly', () => {
		render(<Counter />);
		expect(screen.getByText('Click me')).toBeInTheDocument();
	});

	test('increments count when button is clicked', () => {
		render(<Counter />);
		const button = screen.getByText('Click me');
		fireEvent.click(button);
		expect(screen.getByText('1')).toBeInTheDocument();
	});
});
