import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfilePage from '../../pages/ProfilePage';

const mockUseUser = jest.fn();
jest.mock('../../context/UserContext', () => ({
    useUser: () => mockUseUser()
}));

jest.mock('../../api/user', () => ({
    getUserByUsername: jest.fn()
}));

jest.mock('../../components/Profile/ProfileInfo', () => () => <div data-testid="profileinfo-mock"></div>);
jest.mock('../../components/Feed/SendPost', () => () => <div data-testid="sendpost-mock"></div>);
jest.mock('../../components/Profile/ProfileFeed', () => () => <div data-testid="profilefeed-mock"></div>);
jest.mock('../../components/General/Navbar', () => () => <div data-testid="navbar-mock"></div>);

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useParams: () => ({ username: 'testuser' }),
}));

describe('<ProfilePage />', () => {
    it('renders all sub-components', async () => {
        mockUseUser.mockReturnValue({});
        render(<ProfilePage />);

        await waitFor(() => {
            expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
            expect(screen.getByTestId('profileinfo-mock')).toBeInTheDocument();
            expect(screen.getByTestId('sendpost-mock')).toBeInTheDocument();
            expect(screen.getByTestId('profilefeed-mock')).toBeInTheDocument();
        });
    });

    it('fetches profile by username', async () => {
        const mockUser = { username: 'testuser', id: '123' };
        const { getUserByUsername } = require('../../api/user');
        getUserByUsername.mockResolvedValueOnce(mockUser);

        mockUseUser.mockReturnValue({});

        act(() => {
            render(<ProfilePage />);
        });

        await waitFor(() => {
            expect(getUserByUsername).toHaveBeenCalledWith('testuser');
        });
    });
});
