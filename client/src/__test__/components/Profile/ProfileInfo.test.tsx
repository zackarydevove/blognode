import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserInterface } from '../../../interface/UserInterface';
import ProfileInfo from '../../../components/Profile/ProfileInfo';

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));
  
jest.mock('../../../api/follow', () => ({
    checkFollow: jest.fn(),
    followUser: jest.fn()
}));

beforeEach(() => {
    jest.resetAllMocks();
});

describe('<ProfileInfo />', () => {
	const mockProfile: UserInterface = 
	{
		id: 1,
		email: 'test1@example.com',
		password: 'password123',
		username: 'testuser1',
		followersCount: 10,
		location: 'LA',
		job: 'Software Developer',
		followers: [],
		following: [],
		posts: [],
		likes: [],
		comments: []
    };

    const mockUser: UserInterface = 
	{
		id: 2,
		email: 'test2@example.com',
		password: 'password123',
		username: 'testuser2',
		followersCount: 10,
		location: 'Paris',
		job: 'Social Media Manager',
		followers: [],
		following: [],
		posts: [],
		likes: [],
		comments: []
	};

    // Reset the mock functions before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the profile information correctly', () => {
        render(<ProfileInfo profile={mockProfile} />);

        expect(screen.getByText(mockProfile.username)).toBeInTheDocument();
        expect(screen.getByText(`${mockProfile.followersCount} friends`)).toBeInTheDocument();
        expect(screen.getByText(mockProfile.location)).toBeInTheDocument();
        expect(screen.getByText(mockProfile.job)).toBeInTheDocument();
    });


	// it('check if user follow profile on mount and re-render correctly', () => {
    //     render(<ProfileInfo profile={mockProfile} />);

	// })


    it('handles follow/unfollow actions correctly', async () => {
        // Mock the API calls and returns
        const { checkFollow, followUser } = require('../../api/follow');
        checkFollow.mockResolvedValue(false);
        followUser.mockResolvedValueOnce({ message: "Followed successfully" })
                  .mockResolvedValueOnce({ message: "Unfollowed successfully" });

        render(<ProfileInfo profile={mockProfile} />);

        const followButton = screen.getByRole('button', { name: /follow/i });
        fireEvent.click(followButton);

        // Assert the changes after the follow action, e.g., changed icons or messages

        const unfollowButton = screen.getByRole('button', { name: /unfollow/i });
        fireEvent.click(unfollowButton);

        // Assert the changes after the unfollow action, e.g., changed icons or messages
    });

    // Add more tests as needed, e.g., for the navigation action when clicking the profile icon, for the correct rendering of the gear icon for the current user, etc.
});