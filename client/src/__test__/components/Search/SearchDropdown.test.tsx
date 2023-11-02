import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchDropdown from '../../../components/Search/SearchDropdown';
import { UserInterface } from '../../../interface/UserInterface';

jest.mock('../../../components/Search/UserSearchComponent', () => (props: { user: UserInterface }) => <div>{props.user.username}</div>);

describe('<SearchDropdown />', () => {
    const mockUsers: UserInterface[] = [
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
        },
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
        }
    ];

    it('renders an empty div when no users are provided', () => {
        const { container } = render(<SearchDropdown users={[]} />);
        expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('renders an empty div when users is not an array', () => {
        const { container } = render(<SearchDropdown users={null} />);
        expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('renders UserSearchComponent for each user', () => {
        render(<SearchDropdown users={mockUsers} />);
        
        mockUsers.forEach(user => {
            expect(screen.getByText(user.username)).toBeInTheDocument();
        });
    });
});