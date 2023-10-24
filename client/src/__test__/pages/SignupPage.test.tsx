import { render, screen } from "@testing-library/react";
import SignupPage from "../../pages/SignupPage";

describe("SignupPage", () => {
	it("render correctly", () => {
		render(<SignupPage/>);
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
	})
})	