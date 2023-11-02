import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserSearchComponent from '../../../components/Search/UserSearchComponent';
import { UserInterface } from '../../../interface/UserInterface';
import { useNavigate } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));

describe('<UserSearchComponent />', () => {
    const mockUser: UserInterface = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        followersCount: 10,
        location: 'LA',
        job: 'Software Developer',
        followers: [],
        following: [],
        posts: [],
        likes: [],
        comments: []
    };

	beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders user details correctly', () => {
        render(<UserSearchComponent user={mockUser} />);

        expect(screen.getByText(mockUser.username)).toBeInTheDocument();
        expect(screen.getByText(mockUser.job)).toBeInTheDocument();
    });

    it('navigates to the correct user profile when clicked', () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        render(<UserSearchComponent user={mockUser} />);

        fireEvent.click(screen.getByText(mockUser.username));

        expect(mockNavigate).toHaveBeenCalledWith(`/profile/${mockUser.username}`);
    });
});
