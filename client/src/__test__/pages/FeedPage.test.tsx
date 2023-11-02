import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import FeedPage from "../../pages/FeedPage"

jest.mock('../../components/General/Navbar', () => () => <div data-testid="navbar-mock"></div>);
jest.mock('../../components/Feed/SendPost', () => () => <div data-testid="sendpost-mock"></div>);
jest.mock('../../components/Feed/Feed', () => () => <div data-testid="feed-mock"></div>);
jest.mock('../../components/Feed/RandomAdd', () => () => <div data-testid="randomadd-mock"></div>);
jest.mock('../../components/Feed/FeedProfileInfo', () => () => <div data-testid="feedprofileinfo-mock"></div>);

test('FeedPage renders correctly', () => {
	render(<FeedPage/>);

	expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
	expect(screen.getByTestId('sendpost-mock')).toBeInTheDocument();
    expect(screen.getByTestId('feed-mock')).toBeInTheDocument();
    expect(screen.getByTestId('randomadd-mock')).toBeInTheDocument();
    expect(screen.getByTestId('feedprofileinfo-mock')).toBeInTheDocument();
})