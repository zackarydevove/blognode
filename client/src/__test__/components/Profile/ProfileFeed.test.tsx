import '@testing-library/jest-dom/extend-expect';
import ProfileFeed from '../../../components/Profile/ProfileFeed';
import { getUserPosts } from '../../../api/feed';
import { useUser } from '../../../context/UserContext';
import Post from '../../../components/Feed/Post';
import { render, screen, waitFor } from '@testing-library/react';
import { PostInterface, UserInterface } from '../../../interface/UserInterface';

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

const mockPosts: PostInterface[] = [
	{
		id: 1,
		creatorId: 1,
		creator: mockProfile,
		content: 'This is the first post content.',
		createdAt: new Date('2023-01-01T00:00:00Z'),
		likesCount: 10,
		likes: [],
		commentsCount: 2,
		comments: []
	},
	{
		id: 2,
		creatorId: 1,
		creator: mockProfile,
		content: 'This is the second post content.',
		createdAt: new Date('2023-01-02T00:00:00Z'),
		likesCount: 20,
		likes: [],
		commentsCount: 4,
		comments: []
	}
];

jest.mock('../../../api/feed', () => ({
    getUserPosts: jest.fn(() => Promise.resolve(mockPosts)),
}));

jest.mock('../../../context/UserContext', () => ({
	useUser: jest.fn(() => ({ id: 1 })),
}));

jest.mock('../../../components/Feed/Post', () => {
	return ({ post }: { post: PostInterface }) => <div data-testid="mock-post">{post.content}</div>;
});

describe('ProfileFeed Component', () => {

	it('fetch the posts of the profile correctly', async () => {
		(getUserPosts as jest.Mock).mockResolvedValue(mockPosts);
		render(<ProfileFeed profile={mockProfile} />);
	
		await waitFor(() => {
			expect(getUserPosts).toHaveBeenCalledWith(mockProfile.id);
	
			const postElements = screen.getAllByTestId('mock-post');
	
			expect(postElements).toHaveLength(mockPosts.length);
	
			postElements.forEach((element, index) => {
				expect(element).toHaveTextContent(mockPosts[index].content);
			});
		});
	});

	it('should render loading when profile is not defined', () => {
        render(<ProfileFeed profile={null} />);
        expect(screen.getByText('loading...')).toBeInTheDocument();
    });

});