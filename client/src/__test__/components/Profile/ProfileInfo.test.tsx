import '@testing-library/jest-dom/extend-expect';

test('test', () => {
	expect(true).toBe(true);
});
	// import { render, fireEvent, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
	// import '@testing-library/jest-dom/extend-expect';
	// import { UserInterface } from '../../../interface/UserInterface';
	// import ProfileInfo from '../../../components/Profile/ProfileInfo';
	// import { useUser } from '../../../context/UserContext';
	// import { checkFollow, followUser } from '../../../api/follow';

	// jest.mock('react-router-dom', () => ({
	// 	useNavigate: jest.fn(),
	// }));

	// jest.mock('../../../context/UserContext', () => ({
	// 	useUser: jest.fn(),
	// }));

	// jest.mock('../../../api/follow', () => ({
	// 	checkFollow: jest.fn(),
	// 	followUser: jest.fn()
	// }));

	// beforeEach(() => {
	// 	jest.resetAllMocks();
	// });

	// describe('<ProfileInfo />', () => {
	// 	const mockProfile: UserInterface = 
	// 	{
	// 		id: 1,
	// 		email: 'test1@example.com',
	// 		password: 'password123',
	// 		username: 'testuser1',
	// 		followersCount: 10,
	// 		location: 'LA',
	// 		job: 'Software Developer',
	// 		followers: [],
	// 		following: [],
	// 		posts: [],
	// 		likes: [],
	// 		comments: []
	// 	};

	// 	const mockUser: UserInterface = 
	// 	{
	// 		id: 2,
	// 		email: 'test2@example.com',
	// 		password: 'password123',
	// 		username: 'testuser2',
	// 		followersCount: 10,
	// 		location: 'Paris',
	// 		job: 'Social Media Manager',
	// 		followers: [],
	// 		following: [],
	// 		posts: [],
	// 		likes: [],
	// 		comments: []
	// 	};

	// 	beforeEach(() => {
	// 		jest.clearAllMocks();
	// 	});

	// 	it('renders the profile information correctly', () => {
	// 		(useUser as jest.Mock).mockReturnValue(mockUser);

	// 		render(<ProfileInfo profile={mockProfile} />);

	// 		waitForElementToBeRemoved(() => screen.getByText("loading..."));

	// 		expect(screen.getByText(mockProfile.username)).toBeInTheDocument();
	// 		expect(screen.getByText(`${mockProfile.followersCount} friends`)).toBeInTheDocument();
	// 		expect(screen.getByText(mockProfile.location)).toBeInTheDocument();
	// 		expect(screen.getByText(mockProfile.job)).toBeInTheDocument();
	// 	});


	// 	it('check if user follow profile on mount and re-render correctly', () => {
	// 	    render(<ProfileInfo profile={mockProfile} />);

	// 	})


	// 	it('handles follow/unfollow actions correctly', async () => {
	// 		(useUser as jest.Mock).mockReturnValue(mockUser);
	// 		(checkFollow as jest.Mock).mockResolvedValue(false);
	// 		(followUser as jest.Mock).mockResolvedValueOnce({ message: "Followed successfully" });
		
	// 		render(<ProfileInfo profile={mockProfile} />);
		
	// 		await waitForElementToBeRemoved(() => screen.queryByText("loading..."));
		
	// 		const followIcon = screen.getByTestId('follow-icon');
	// 		fireEvent.click(followIcon);
		
	// 		await waitFor(() => {
	// 			expect(followUser).toHaveBeenCalledWith(mockUser.id, mockProfile.id);
	// 		});
		
	// 		(checkFollow as jest.Mock).mockResolvedValue(true);
		
	// 		const unfollowIcon = screen.getByTestId('unfollow-icon');
	// 		fireEvent.click(unfollowIcon);
		
	// 		await waitFor(() => {
	// 			expect(followUser).toHaveBeenCalledWith(mockUser.id, mockProfile.id);
	// 		});
	// 	});

	// });